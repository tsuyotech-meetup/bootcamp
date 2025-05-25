---
footer: MIT Licensed
title: Docker Compose基礎編 - 複数コンテナの連携を学ぼう
description: Docker Composeを使って複数のサービスを連携させ、実用的な開発環境を構築します
---

<header-table/>

# {{$page.frontmatter.title}}

## 学習目標
この章を完了すると、以下のことができるようになります：

- **Docker Composeの基本構文を理解**し、複数コンテナを連携できる
- **ネットワークとボリューム**を使った永続化とサービス間通信を実装できる
- **実用的な開発環境**を Docker Compose で構築できる
- **ヘルスチェック**による確実な起動順序制御を適用できる

## 事前準備

### 前提条件
- [第1部: Dockerfile基礎編](./01_dockerfile_basic.md)を完了していること
- 前章で作成した Flask アプリケーションが利用可能であること

### 作業ディレクトリの準備
```sh
cd docker-handson
mkdir 02-compose
cd 02-compose
```

## Docker Composeとは

**Docker Compose**は、複数のDockerコンテナを定義・実行するためのツールです。YAMLファイルでサービス構成を記述し、一つのコマンドで複数のコンテナを起動・停止できます。

### Docker Composeの利点

| 利点 | 説明 |
|------|------|
| **簡単な構成管理** | YAMLファイルで全サービスを一元管理 |
| **サービス間通信** | 自動的なネットワーク作成と名前解決 |
| **データ永続化** | ボリュームによるデータ保持 |
| **環境の再現性** | 開発・テスト・本番環境の統一 |
| **スケーラビリティ** | サービスの複製と負荷分散 |

### 基本的なCompose命令

| 命令 | 説明 | 例 |
|------|------|-----|
| `docker compose up` | サービスを起動 | `docker compose up -d` |
| `docker compose down` | サービスを停止・削除 | `docker compose down` |
| `docker compose logs` | ログを表示 | `docker compose logs app` |
| `docker compose ps` | 実行中のサービスを表示 | `docker compose ps` |
| `docker compose exec` | コンテナ内でコマンド実行 | `docker compose exec app bash` |

## ハンズオン1: 最初のCompose - Flask + NGINX

### :dart: 目標
前章で作成したFlaskアプリケーションにNGINXを追加し、リバースプロキシ構成を作成します。

### :memo: 実装

**1. プロジェクト構成の準備**
```sh
mkdir hands-on1-<user name>
cd hands-on1-<user name>
mkdir nginx
```

**ディレクトリ構成**
```
hands-on1-<user name>/
├── compose.yml
└── nginx/
    └── nginx.conf
```

**2. 前章のFlaskアプリを確認**
```sh
# 前章で作成したイメージを確認
docker images | grep flask-app

# 利用可能なイメージ例：
# flask-app-distroless
# flask-app-after
```

**3. NGINXの設定ファイルを作成**
```nginx
# nginx/nginx.conf
events {
    worker_connections 1024;
}

http {
    upstream flask_app {
        server app:5000;
    }
    
    server {
        listen 80;
        server_name localhost;
        
        # アクセスログ
        access_log /var/log/nginx/access.log;
        error_log /var/log/nginx/error.log;
        
        # Flask アプリケーションへのプロキシ
        location / {
            proxy_pass http://flask_app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            
            # タイムアウト設定
            proxy_connect_timeout 60s;
            proxy_send_timeout 60s;
            proxy_read_timeout 60s;
        }
        
        # ヘルスチェック用エンドポイント
        location /nginx-health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }
    }
}
```

**4. 最初のcompose.ymlを作成**
```yaml
# compose.yml
services:
  app:
    image: flask-app-distroless-<user name>
    # image: flask-app-before-<user name>
    # image: flask-app-after-<user name>
    restart: unless-stopped
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    restart: unless-stopped
    ports:
      - "8080:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - app
    networks:
      - app-network
    environment:
      - TZ=Asia/Tokyo

networks:
  app-network:
    driver: bridge
```

**5. サービスを起動**
```sh
# バックグラウンドで起動
docker compose up -d

# 起動状況を確認
docker compose ps

# ログを確認
docker compose logs -f
```

### :white_check_mark: 動作確認

**1. Webアクセス確認**
```sh
# ブラウザまたはcurlでアクセス
curl http://localhost:8080/

# NGINXのヘルスチェック
curl http://localhost:8080/nginx-health
```

**2. サービス間通信の確認**
```sh
# NGINXからFlaskへの接続テスト
docker compose exec nginx ping app

# NGINXコンテナ内からFlaskにアクセス
docker compose exec nginx curl http://app:5000/
```

**3. ログの確認**
```sh
# NGINXのアクセスログ
docker compose logs nginx -n 20

# Flaskアプリのログ
docker compose logs -f app
```

### :bulb: 解説

**重要な概念:**
- **networks**: `app-network`でコンテナ間通信を実現
- **depends_on**: NGINXがFlaskより後に起動するよう制御
- **volumes**: NGINX設定ファイルをコンテナにマウント
- **サービス名による名前解決**: `app:5000`でFlaskコンテナにアクセス可能

**リバースプロキシの利点:**
- フロントエンドとバックエンドの分離
- 静的ファイル配信の高速化
- SSL終端やロードバランシングの一元化

## ハンズオン2: Flask + MySQL - データ永続化とヘルスチェック

### :dart: 目標
- データベースとの連携でデータ永続化を実現
- ヘルスチェックによる確実なサービス起動順序制御
- 実用的なWebアプリケーションの完成

### :memo: 実装

**1. プロジェクト構成**
```sh
mkdir hands-on2-<user name>
cd hands-on2-<user name>
mkdir -p app/templates mysql
```

**ディレクトリ構成**
```
hands-on2-<user name>/
├── compose.yml
├── Dockerfile
├── app/
│   ├── templates/
│   │   └── index.html
│   ├── main.py
│   └── requirements.txt
└── mysql/
    └── init.sql
```

**2. データベース対応のFlaskアプリ**
```python
from flask import Flask, request, jsonify, render_template
import mysql.connector
import os
from datetime import datetime

app = Flask(__name__)

# データベース設定
DB_CONFIG = {
    'host': os.environ.get('DB_HOST', 'db'),
    'database': os.environ.get('DB_NAME', 'flask_app'),
    'user': os.environ.get('DB_USER', 'flask_user'),
    'password': os.environ.get('DB_PASSWORD', 'flask_password')
}

def get_db_connection():
    try:
        return mysql.connector.connect(**DB_CONFIG)
    except mysql.connector.Error as err:
        print(f"Database connection error: {err}")
        return None


@app.route('/')
def home():
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor()
        
        # 訪問記録を保存
        cursor.execute(
            "INSERT INTO visits (ip_address, timestamp, user_agent) VALUES (%s, %s, %s)",
            (request.remote_addr, datetime.now(), request.headers.get('User-Agent', ''))
        )
        conn.commit()
        
        # 総訪問数を取得
        cursor.execute("SELECT COUNT(*) FROM visits")
        visit_count = cursor.fetchone()[0]
        
        # 最近の訪問履歴を取得
        cursor.execute("SELECT ip_address, timestamp FROM visits ORDER BY timestamp DESC LIMIT 10")
        recent_visits = [{'ip_address': row[0], 'timestamp': row[1]} for row in cursor.fetchall()]
        
        cursor.close()
        conn.close()
        
        return render_template('index.html',
                                visit_count=visit_count,
                                database_status='connected',
                                current_time=datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                                recent_visits=recent_visits)
    else:
        return {'error': 'Database connection failed'}, 500

@app.route('/api/visits')
def api_visits():
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor()
        cursor.execute("SELECT ip_address, timestamp, user_agent FROM visits ORDER BY timestamp DESC LIMIT 50")
        visits = [
            {
                'ip_address': row[0],
                'timestamp': row[1].isoformat(),
                'user_agent': row[2]
            }
            for row in cursor.fetchall()
        ]
        cursor.close()
        conn.close()
        return jsonify({'visits': visits, 'count': len(visits)})
    return jsonify({'error': 'Database connection failed'}), 500

@app.route('/health')
def health():
    # データベース接続をテスト
    conn = get_db_connection()
    if conn:
        conn.close()
        return jsonify({'status': 'healthy', 'database': 'connected'}), 200
    return jsonify({'status': 'unhealthy', 'database': 'disconnected'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
```

**3. 依存関係ファイルを作成**
```txt
# app/requirements.txt
flask==3.1.1
mysql-connector-python==9.3.0
```

**4. HTMLテンプレートを作成**
```html
<!-- app/templates/index.html -->
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>Flask + MySQL アプリ</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { color: #2196F3; text-align: center; margin-bottom: 30px; }
        .stats { background: #e3f2fd; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .visits { background: #f3e5f5; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .visit-item { border-bottom: 1px solid #ddd; padding: 10px 0; }
        .api-links { margin: 20px 0; }
        .api-links a { margin-right: 15px; color: #1976d2; text-decoration: none; }
        .api-links a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="header">🐳 Flask + MySQL アプリケーション</h1>
        
        <div class="stats">
            <h2>アクセス統計</h2>
            <p><strong>総訪問数:</strong> {{ visit_count }}</p>
            <p><strong>データベース状態:</strong> {{ database_status }}</p>
            <p><strong>現在時刻:</strong> {{ current_time }}</p>
        </div>
        
        <div class="visits">
            <h2>最近の訪問履歴</h2>
            {% for visit in recent_visits %}
            <div class="visit-item">
                <strong>{{ visit.timestamp }}</strong> - {{ visit.ip_address }}
            </div>
            {% endfor %}
        </div>
        
        <div class="api-links">
            <h2>API エンドポイント</h2>
            <a href="/api/visits">GET /api/visits</a>
            <a href="/health">GET /health</a>
            <a href="/nginx-health">GET /nginx-health</a>
        </div>
    </div>
</body>
</html>
```

**5. Dockerfileを作成**
```dockerfile
# Dockerfile
FROM python:3.13-slim

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係をインストールするためのファイルをコピー
COPY app/requirements.txt .

# 必要なパッケージとPythonライブラリをインストール
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    pip install --no-cache-dir -r requirements.txt && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# アプリケーションファイルをコピー
COPY app/ .

# セキュリティ：非rootユーザーを作成
RUN adduser --disabled-password --no-create-home appuser && \
    chown -R appuser:appuser /app
USER appuser

# ポートを公開
EXPOSE 5000

# アプリケーション起動
CMD ["python", "main.py"]
```

**5. MySQL初期化スクリプト**
```sql
-- mysql/init.sql
USE flask_app;

CREATE TABLE IF NOT EXISTS visits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(45) NOT NULL,
    timestamp DATETIME NOT NULL,
    user_agent TEXT,
    INDEX idx_timestamp (timestamp),
    INDEX idx_ip (ip_address)
);

-- 初期データを挿入（デモ用）
INSERT INTO visits (ip_address, timestamp, user_agent) VALUES 
('127.0.0.1', NOW(), 'Initial Setup Browser'),
('192.168.1.100', NOW(), 'Test User Agent'),
('10.0.0.1', NOW(), 'Docker Health Check');
```

**6. ヘルスチェック付きcompose.yml**
```yaml
# compose.yml
services:
  app:
    build: .
    restart: unless-stopped
    ports:
      - "5000:5000"
    environment:
      - TZ=Asia/Tokyo
      - DB_HOST=db
      - DB_NAME=flask_app
      - DB_USER=flask_user
      - DB_PASSWORD=flask_password
    depends_on:
      db:
        condition: service_healthy  # DBの完全起動を待つ
    networks:
      - app-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  db:
    image: mysql:8.0-bookworm
    restart: unless-stopped
    environment:
      - TZ=Asia/Tokyo
      - MYSQL_ROOT_PASSWORD=root_password
      - MYSQL_DATABASE=flask_app
      - MYSQL_USER=flask_user
      - MYSQL_PASSWORD=flask_password
    volumes:
      - mysql_data:/var/lib/mysql
      - ./mysql/init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    networks:
      - app-network
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "flask_user", "-pflask_password"]
      timeout: 20s
      retries: 10
      start_period: 30s

networks:
  app-network:
    driver: bridge

volumes:
  mysql_data:  # データベースデータの永続化
```

### :white_check_mark: 動作確認

**1. サービスを起動**
```sh
# プロジェクトディレクトリで実行
docker compose up -d

# 起動状況を確認（ヘルスチェック状態も含む）
docker compose ps
```

**2. アプリケーションの動作確認**
```sh
# Webブラウザまたはcurlでアクセス
curl http://localhost:5000/

# JSON APIの確認
curl http://localhost:5000/api/visits | jq

# ヘルスチェックエンドポイントの確認
curl http://localhost:5000/health

# 複数回アクセスして訪問数の増加を確認
for i in {1..5}; do curl -s http://localhost:5000/ | grep visit_count; done
```

**3. データベースの直接確認**
```sh
# MySQLコンテナに接続
docker compose exec db mysql -u flask_user -pflask_password flask_app

# SQLで訪問記録を確認
SELECT id, ip_address, timestamp FROM visits ORDER BY timestamp DESC LIMIT 10;

# テーブル構造の確認
DESCRIBE visits;

# 総レコード数の確認
SELECT COUNT(*) as total_visits FROM visits;

EXIT;
```

**4. ヘルスチェックの動作確認**
```sh
# 各サービスのヘルス状態を確認
docker inspect $(docker compose ps -q app) | jq '.[0].State.Health'
docker inspect $(docker compose ps -q db) | jq '.[0].State.Health'
```

**5. データ永続化の確認**
```sh
# コンテナを停止してデータを確認
docker compose down

# 再度起動してデータが保持されているか確認
docker compose up -d

# Volumeごと削除
docker compose down -v
```


### :bulb: 重要な学習ポイント

**1. ヘルスチェックによる起動順序制御**
- `condition: service_healthy`でDBが完全に起動してからアプリが起動
- 従来の`depends_on`だけでは不十分な問題を解決

**2. データ永続化の仕組み**
- `mysql_data`ボリュームでコンテナを削除してもデータが保持
- 初期化スクリプトは初回起動時のみ実行

**3. 環境変数による設定管理**
- ハードコードを避けて設定を外部化
- セキュリティと保守性の向上

**4. サービス間通信**
- Docker Composeが自動的に内部DNSを提供
- `app`から`db:3306`でMySQLにアクセス可能


## よくある問題と解決方法

### 問題1: データベース接続エラー
```sh
# データベースの状態確認
docker compose logs db

# ネットワーク接続確認
docker compose exec app ping db

# 環境変数の確認
docker compose exec app env | grep DB_
```

### 問題2: ヘルスチェックが失敗する
```sh
# ヘルスチェックのログ確認
docker inspect $(docker compose ps -q app) | jq '.[0].State.Health'

# 手動でヘルスチェック実行
docker compose exec app curl localhost:5000/health

# MySQLのヘルスチェック確認
docker compose exec db mysqladmin ping -h localhost -u flask_user -pflask_password
```

### 問題3: テーブルが作成されない
```sh
# 初期化スクリプトが実行されたか確認
docker compose logs db | grep init.sql

# テーブルの存在確認
docker compose exec db mysql -u flask_user -pflask_password -e "SHOW TABLES;" flask_app

# ボリュームを削除して再初期化
docker compose down -v
docker compose up -d
```

### 問題4: ポートがすでに使用中
```sh
# 使用中のポートを確認
netstat -tulpn | grep :5000
netstat -tulpn | grep :3306

# 別のポートを使用
# compose.ymlの ports を変更
# "5001:5000" や "3307:3306" など
```

### 問題5: 前章のイメージが見つからない
```sh
# 利用可能なイメージを確認
docker images | grep flask

# 必要に応じてDockerfileでビルド
# compose.ymlで image を build に変更
```

## 学習チェックリスト

- [ ] ハンズオン1: Flask + NGINX 構成が動作した
- [ ] ハンズオン2: データベース統合でデータが永続化された
- [ ] サービス間通信（name resolution）を確認できた
- [ ] ヘルスチェックで起動順序が制御されることを理解した
- [ ] ボリュームによる永続化を実装できた
- [ ] 環境変数による設定管理ができた
- [ ] APIエンドポイントで JSON データを取得できた


### 達成レベル
- **初級**: ハンズオン1完了（サービス間通信の理解）
- **中級**: ハンズオン2完了（データ永続化とヘルスチェック）

### 次のステップ
- [第3部: 実践応用編](./03_practical_usage.md) - より高度な運用技術を学ぼう

::: tip :bulb: Compose基礎完了！
複数コンテナの連携システムを構築できるようになりました。次は3層構成やプロダクション運用の技術を学びましょう！
:::
