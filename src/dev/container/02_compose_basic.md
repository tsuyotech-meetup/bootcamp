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
- **本番運用を考慮した設定**を適用できる

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
| `docker-compose up` | サービスを起動 | `docker-compose up -d` |
| `docker-compose down` | サービスを停止・削除 | `docker-compose down` |
| `docker-compose logs` | ログを表示 | `docker-compose logs app` |
| `docker-compose ps` | 実行中のサービスを表示 | `docker-compose ps` |
| `docker-compose exec` | コンテナ内でコマンド実行 | `docker-compose exec app bash` |

## ハンズオン1: 最初のCompose - Flask + NGINX

### :dart: 目標
前章で作成したFlaskアプリケーションにNGINXを追加し、リバースプロキシ構成を作成します。

### :memo: 実装

**1. プロジェクト構成の確認**
```
flask-nginx-app/
├─ compose.yml
└─ nginx/
  └─ nginx.conf
```

**2. 前章のFlaskアプリを準備**
```sh
# 前章で作成したイメージを確認
docker images | grep flask-app
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
    image: flask-app-distroless
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

# ログを確認
docker compose logs -f
```

### :white_check_mark: 動作確認
1. ブラウザで `http://localhost:8080` にアクセス
2. Flaskアプリケーションが表示されることを確認
3. NGINXを経由してアクセスできることを確認

### :bulb: 解説
- **networks**: コンテナ間通信のための仮想ネットワーク
- **depends_on**: サービスの起動順序を制御
- **volumes**: ファイルの共有とデータ永続化
- **environment**: 環境変数の設定
- **サービス名による名前解決**: `app:5000`でFlaskコンテナにアクセス
