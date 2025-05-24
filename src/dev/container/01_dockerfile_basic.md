---
footer: MIT Licensed
title: Dockerfile基礎編 - 最初のコンテナを作ってみよう
description: Dockerfileの基本的な書き方を学び、実際にWebアプリケーションのコンテナを作成します
---

<header-table/>

# {{$page.frontmatter.title}}

## 学習目標
この章を完了すると、以下のことができるようになります：

- **Dockerfileの基本構文を理解**し、シンプルなイメージを作成できる
- **効率的なレイヤー構成**を考慮したDockerfileを書ける
- **Webアプリケーション用コンテナ**を作成し、動作確認できる
- **Dockerfileのベストプラクティス**を適用できる

## 事前準備

### 作業ディレクトリの準備
```sh
mkdir docker-handson
cd docker-handson
mkdir 01-basic
cd 01-basic
```

## Dockerfileとは

**Dockerfile**は、コンテナイメージを作成するための設計書です。テキストファイルに記述されたインストラクション（命令）に従って、自動的にイメージがビルドされます。

### 主要なインストラクション

| 命令 | 説明 | 例 |
|------|------|-----|
| `FROM` | ベースイメージを指定 | `FROM ubuntu:20.04` |
| `RUN` | ビルド時にコマンド実行 | `RUN apt-get update` |
| `COPY` | ファイルをコンテナにコピー | `COPY app.py /app/` |
| `WORKDIR` | 作業ディレクトリを設定 | `WORKDIR /app` |
| `EXPOSE` | ポートを公開 | `EXPOSE 8080` |
| `CMD` | コンテナ起動時のデフォルトコマンド | `CMD ["python", "app.py"]` |

## ハンズオン1: Hello Worldコンテナを作ろう

### :dart: 目標
最も基本的なDockerfileを作成し、ビルド・実行の流れを体験します。

### :memo: 実装

**1. Dockerfileを作成**
```Dockerfile
# Dockerfile
FROM ubuntu:24.04

# シンプルなHello Worldを出力
CMD ["echo", "Hello, Docker World!"]
```

**2. イメージをビルド**
```sh
docker build -t hello-docker-<user name> .
# docker build -t hello-docker-conan .
```

**3. コンテナを実行**
```sh
docker run hello-docker-<user name>
# docker run hello-docker-conan
```

### :white_check_mark: 動作確認
以下の出力が表示されることを確認：
```
Hello, Docker World!
```

### :bulb: 解説
- `FROM ubuntu:24.04`: Ubuntu 24.04をベースイメージとして使用
- `CMD`: コンテナ起動時に実行されるデフォルトコマンド
- `-t hello-docker-<user name>`: ビルドするイメージに名前（タグ）を付与

## ハンズオン2: シンプルなWebサーバーを作ろう

### :dart: 目標
Pythonを使ったシンプルなWebサーバーのコンテナを作成します。

### :memo: 実装

**1. Pythonアプリケーションを作成**
```python
# main.py
from http.server import HTTPServer, SimpleHTTPRequestHandler
import os
import sys

class MyHTTPRequestHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html; charset=UTF-8')
        self.end_headers()
        html = '''
        <html>
            <head>
                <meta charset="UTF-8">
            </head>
            <body>
                <h1>🐳 Hello from Docker!</h1>
                <p>このページはDockerコンテナ内で動いています。</p>
            </body>
        </html>
        '''
        self.wfile.write(html.encode('utf-8'))

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    server = HTTPServer(('0.0.0.0', port), MyHTTPRequestHandler)
    
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server...")
    finally:
        server.server_close()
        print("Server stopped")
        sys.exit(0)
```

**2. Dockerfileを作成**
```Dockerfile
# Dockerfile
FROM python:3.13

# 作業ディレクトリを設定
WORKDIR /app

# アプリケーションファイルをコピー
COPY main.py .

# ポートを公開
EXPOSE 8080

# アプリケーションを起動
CMD ["python", "main.py"]
```

**3. イメージをビルドして実行**
```sh
# イメージビルド
docker build -t simple-web-<user name> .

# コンテナ実行（ポートマッピング付き）
docker run -p 8080:8080 simple-web-<user name>
```

### :white_check_mark: 動作確認
ブラウザで `http://localhost:8080` にアクセスし、Webページが表示されることを確認。

### :bulb: 解説
- `python:3.13`: Python環境のベースイメージ
- `WORKDIR /app`: 以降の作業ディレクトリを設定
- `COPY app.py .`: ローカルのapp.pyをコンテナの現在位置にコピー
- `-p 8080:8080`: ホストのポート8080をコンテナのポート8080にマッピング


## Dockerfileベストプラクティス

### 1. 軽量なベースイメージを選択
```Dockerfile
# 良い例: 軽量版を使用
FROM python:3.13-slim

# 避けるべき例: フルサイズ版
FROM python:3.13
```

### 2. レイヤー数を最適化
```Dockerfile
# 良い例: RUNを結合
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# 避けるべき例: 個別のRUN
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get clean
```

### 3. キャッシュを効率的に活用
```Dockerfile
# 良い例: 変更頻度の低いものを先に
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .

# 避けるべき例: すべてを一度にコピー
COPY . .
RUN pip install -r requirements.txt
```

### 4. セキュリティを考慮
```Dockerfile
# 非rootユーザーで実行
RUN useradd -m appuser
USER appuser

# 機密情報をハードコードしない
ENV DATABASE_URL=${DATABASE_URL}
```


## ハンズオン3: 実用的なWebアプリケーショ

### :dart: 目標
- 依存関係を含む実用的なWebアプリケーションのコンテナを作成します。
- ベストプラクティスに則さないポイントを修正して効率的なDockerfileにリファクタリングする。

**1. 要件ファイルをgitから取得**
```
git clone https://github.com/tsuyotech-meetup/bootcamp-docker-sample.git
cd bootcamp-docker-sample
```

**2. ビルドと実行**
```sh
# イメージビルド
docker build -t flask-app-before .

# コンテナ実行
docker run -p 5000:5000 flask-app-before
```

### :white_check_mark: 動作確認
1. ブラウザで `http://localhost:5000` にアクセス
2. ページの訪問回数が増加することを確認


### :warning: 現在のDockerfileの問題点
GitHubから取得したコードを確認し、以下の問題を見つけて修正してください：

**問題1: キャッシュ効率が悪い**
- 依存関係のインストールが毎回実行される
- アプリケーションコードの変更時も依存関係が再インストールされる

**問題2: セキュリティリスク**
- rootユーザーでアプリケーションが実行される
- 不要なファイルがコンテナイメージに含まれる

**問題3: イメージサイズが大きい**
- フルサイズのPythonイメージを使用
- 開発用の依存関係も含まれている


### :mag: 改善効果の測定
修正前後でイメージサイズとビルド時間を比較してみましょう：

```sh
# イメージサイズの確認
docker images flask-app-before
docker images flask-app-after

# ビルド時間の測定
time docker build -t flask-app-after .
```

### :thinking: 改善チャレンジ
まずは自分で改善版Dockerfileを作成してみてください！

::: details 解答例を見る

**改善版Dockerfileの例**
```Dockerfile
# 改善1: 軽量版イメージを使用
FROM python:3.13-slim

# 改善2: 作業ディレクトリを最初に設定
WORKDIR /app

# 改善3: 要件ファイルを先にコピー（キャッシュ効率化）
COPY ./app/requirements.txt .

# 改善4: 必要最小限のパッケージのみインストール
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    pip install --no-cache-dir -r requirements.txt && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# 改善5: アプリケーションファイルをコピー
COPY app/ ./app/

# 改善6: 非rootユーザーを作成
RUN adduser --disabled-password --no-create-home appuser && \
    chown -R appuser:appuser /app
USER appuser

# 改善7: ポート公開
EXPOSE 5000

# 改善8: ヘルスチェック追加
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/health || exit 1

# アプリケーション起動
CMD ["python", "app/main.py"]
```

**.dockerignoreファイル**
```ini
# .dockerignore
__pycache__
*.pyc
*.pyo
*.pyd
.Python
.git
.pytest_cache
.venv
node_modules
README.md
.gitignore
```

**主な改善点：**
1. **軽量化**: `python:3.13-slim`を使用してサイズ削減
2. **キャッシュ効率**: requirements.txtを先にコピー
3. **セキュリティ**: 非rootユーザー（appuser）で実行
4. **不要ファイル除外**: .dockerignoreで最適化

:::


## ハンズオン4: 究極の最適化 - Distroless & マルチステージビルド

### :dart: 目標
- マルチステージビルドによる超軽量イメージの作成
- Distrolessイメージによるセキュリティ強化
- プロダクション品質のコンテナ構築技術の習得

### :memo: 実装

**1. 従来版とのイメージサイズ比較準備**
```sh
# ハンズオン3の改善版イメージサイズを確認
docker images flask-app-after
```

**2. マルチステージ + Distroless Dockerfileを作成**
```dockerfile
# Dockerfile.distroless
# ============================================
# Stage 1: ビルドステージ
# ============================================
FROM python:3.11-slim AS builder

# 依存関係をシステムにインストール
COPY app/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt


# ============================================
# Stage 2: 実行ステージ（Distroless）
# ============================================
FROM gcr.io/distroless/python3-debian12:latest

# site-packagesを直接コピー
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages

# アプリケーションファイルをコピー
COPY --chown=nonroot:nonrootp app/ /app/

# 環境変数設定
ENV PYTHONPATH="/usr/local/lib/python3.11/site-packages"

# 作業ディレクトリ設定
WORKDIR /app

# 非特権ユーザーで実行
USER nonroot:nonroot

# ポート公開
EXPOSE 5000

# アプリケーション起動
CMD ["main.py"]
```

**2. イメージビルドと比較**
```sh
# 従来版のサイズ確認
docker images flask-app-after

# Distroless版をビルド
docker build -f Dockerfile.distroless -t flask-app-distroless .

# サイズ比較
docker images flask-app-after --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"
docker images flask-app-distroless --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"
```

**3. 実行と動作確認**
```sh
# Distroless版を実行
docker run -p 5000:5000 flask-app-distroless
```

### :white_check_mark: 動作確認
1. ブラウザで `http://localhost:5000` にアクセス


### :bulb: 解説

**マルチステージビルドの利点:**
- **ビルド環境と実行環境の分離**: 開発ツールを実行イメージに含めない
- **イメージサイズの最小化**: 必要なファイルのみを実行ステージにコピー
- **セキュリティ向上**: 攻撃対象の最小化

**Distrolessイメージの特徴:**
- **シェルなし**: 攻撃者がシェルアクセスできない
- **パッケージマネージャーなし**: 追加ソフトウェアをインストールできない  
- **最小限のファイルシステム**: アプリケーション実行に必要な最小限のみ
- **非rootユーザー**: デフォルトで非特権ユーザーで実行

### :shield: セキュリティ強化の確認

**コンテナ内への侵入不可能性をテスト**
```sh
# 標準イメージ: シェルアクセス可能
docker run -it --rm flask-app-after bash
# → シェルが起動する

# Distrolessイメージ: シェルアクセス不可
docker run -it --rm flask-app-distroless bash
# → エラーが発生（シェルが存在しない）
```

**脆弱性スキャンの実践**
```sh
# Docker Scout を使用した脆弱性スキャン（Docker Desktop必要）
docker scout cves flask-app-after
docker scout cves flask-app-distroless
```


### :warning: 制限事項と注意点

**Distrolessの制約:**
- デバッグが困難（シェルアクセス不可）
- トラブルシューティング時の調査方法が限定的
- 一部のライブラリが動作しない可能性

**デバッグ方法:**
```sh
# デバッグ用にビルドステージのイメージを作成
docker build --target builder -t flask-debug .

# ビルドステージでデバッグ
docker run -it flask-debug bash
```


## よくある問題と解決方法

### 問題1: ポート8080が既に使用中
```sh
# 使用中のポートを確認
netstat -tulpn | grep :8080

# 別のポートを使用
docker run -p 8081:8080 simple-web-<user name>
```

### 問題2: イメージが見つからない
```sh
# 作成したイメージを確認
docker images

# タグ名を正確に指定
docker run hello-docker-yourname
```

### 問題3: コンテナが停止しない
```sh
# 強制停止
docker ps  # 実行中のコンテナIDを確認
docker stop <container_id>
docker kill <container_id>  # 強制終了
```


## 学習チェックリスト

- [ ] ハンズオン1: Hello Worldが実行できた
- [ ] ハンズオン2: Webページにアクセスできた  
- [ ] ハンズオン3: 問題点を3つ以上発見できた
- [ ] **ハンズオン4: Distrolessイメージが実行できた**
- [ ] **マルチステージビルドでイメージサイズが大幅削減された**
- [ ] **シェルアクセスが不可能なことを確認できた**
- [ ] **脆弱性数の減少を確認できた**


### 達成レベル
- **初級**: ハンズオン1-2完了
- **中級**: ハンズオン3完了（問題解決能力）  
- **上級**: ハンズオン4完了（プロダクション品質）

### 次のステップ
- [第2部: Docker Compose基礎編](./02_compose_basic.md) - 複数コンテナの連携を学ぼう