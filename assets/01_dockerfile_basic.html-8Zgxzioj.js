import{_ as c,c as r,e as a,b as n,a as d,t as o,d as e,w as u,r as l,o as m}from"./app-BnP3mkOd.js";const v={},b={id:"page-frontmatter-title",tabindex:"-1"},h={class:"header-anchor",href:"#page-frontmatter-title"};function k(i,s){const p=l("header-table"),t=l("RouteLink");return m(),r("div",null,[a(p),n("h1",b,[n("a",h,[n("span",null,o(i.$page.frontmatter.title),1)])]),s[2]||(s[2]=d(`<h2 id="学習目標" tabindex="-1"><a class="header-anchor" href="#学習目標"><span>学習目標</span></a></h2><p>この章を完了すると、以下のことができるようになります：</p><ul><li><strong>Dockerfileの基本構文を理解</strong>し、シンプルなイメージを作成できる</li><li><strong>効率的なレイヤー構成</strong>を考慮したDockerfileを書ける</li><li><strong>Webアプリケーション用コンテナ</strong>を作成し、動作確認できる</li><li><strong>Dockerfileのベストプラクティス</strong>を適用できる</li></ul><h2 id="事前準備" tabindex="-1"><a class="header-anchor" href="#事前準備"><span>事前準備</span></a></h2><h3 id="作業ディレクトリの準備" tabindex="-1"><a class="header-anchor" href="#作業ディレクトリの準備"><span>作業ディレクトリの準備</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token function">mkdir</span> docker-handson</span>
<span class="line"><span class="token builtin class-name">cd</span> docker-handson</span>
<span class="line"><span class="token function">mkdir</span> 01-basic</span>
<span class="line"><span class="token builtin class-name">cd</span> 01-basic</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="dockerfileとは" tabindex="-1"><a class="header-anchor" href="#dockerfileとは"><span>Dockerfileとは</span></a></h2><p><strong>Dockerfile</strong>は、コンテナイメージを作成するための設計書です。テキストファイルに記述されたインストラクション（命令）に従って、自動的にイメージがビルドされます。</p><h3 id="主要なインストラクション" tabindex="-1"><a class="header-anchor" href="#主要なインストラクション"><span>主要なインストラクション</span></a></h3><table><thead><tr><th>命令</th><th>説明</th><th>例</th></tr></thead><tbody><tr><td><code>FROM</code></td><td>ベースイメージを指定</td><td><code>FROM ubuntu:20.04</code></td></tr><tr><td><code>RUN</code></td><td>ビルド時にコマンド実行</td><td><code>RUN apt-get update</code></td></tr><tr><td><code>COPY</code></td><td>ファイルをコンテナにコピー</td><td><code>COPY app.py /app/</code></td></tr><tr><td><code>WORKDIR</code></td><td>作業ディレクトリを設定</td><td><code>WORKDIR /app</code></td></tr><tr><td><code>EXPOSE</code></td><td>ポートを公開</td><td><code>EXPOSE 8080</code></td></tr><tr><td><code>CMD</code></td><td>コンテナ起動時のデフォルトコマンド</td><td><code>CMD [&quot;python&quot;, &quot;app.py&quot;]</code></td></tr></tbody></table><h2 id="ハンズオン1-hello-worldコンテナを作ろう" tabindex="-1"><a class="header-anchor" href="#ハンズオン1-hello-worldコンテナを作ろう"><span>ハンズオン1: Hello Worldコンテナを作ろう</span></a></h2><h3 id="目標" tabindex="-1"><a class="header-anchor" href="#目標"><span>🎯 目標</span></a></h3><p>最も基本的なDockerfileを作成し、ビルド・実行の流れを体験します。</p><h3 id="実装" tabindex="-1"><a class="header-anchor" href="#実装"><span>📝 実装</span></a></h3><p><strong>1. Dockerfileを作成</strong></p><div class="language-Dockerfile line-numbers-mode" data-highlighter="prismjs" data-ext="Dockerfile"><pre><code><span class="line"># Dockerfile</span>
<span class="line">FROM ubuntu:24.04</span>
<span class="line"></span>
<span class="line"># シンプルなHello Worldを出力</span>
<span class="line">CMD [&quot;echo&quot;, &quot;Hello, Docker World!&quot;]</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2. イメージをビルド</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token function">docker</span> build <span class="token parameter variable">-t</span> hello-docker-<span class="token operator">&lt;</span>user name<span class="token operator">&gt;</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token comment"># docker build -t hello-docker-conan .</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3. コンテナを実行</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token function">docker</span> run hello-docker-<span class="token operator">&lt;</span>user name<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment"># docker run hello-docker-conan</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="動作確認" tabindex="-1"><a class="header-anchor" href="#動作確認"><span>✅ 動作確認</span></a></h3><p>以下の出力が表示されることを確認：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">Hello, Docker World!</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="解説" tabindex="-1"><a class="header-anchor" href="#解説"><span>💡 解説</span></a></h3><ul><li><code>FROM ubuntu:24.04</code>: Ubuntu 24.04をベースイメージとして使用</li><li><code>CMD</code>: コンテナ起動時に実行されるデフォルトコマンド</li><li><code>-t hello-docker-&lt;user name&gt;</code>: ビルドするイメージに名前（タグ）を付与</li></ul><h2 id="ハンズオン2-シンプルなwebサーバーを作ろう" tabindex="-1"><a class="header-anchor" href="#ハンズオン2-シンプルなwebサーバーを作ろう"><span>ハンズオン2: シンプルなWebサーバーを作ろう</span></a></h2><h3 id="目標-1" tabindex="-1"><a class="header-anchor" href="#目標-1"><span>🎯 目標</span></a></h3><p>Pythonを使ったシンプルなWebサーバーのコンテナを作成します。</p><h3 id="実装-1" tabindex="-1"><a class="header-anchor" href="#実装-1"><span>📝 実装</span></a></h3><p><strong>1. Pythonアプリケーションを作成</strong></p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code><span class="line"><span class="token comment"># main.py</span></span>
<span class="line"><span class="token keyword">from</span> http<span class="token punctuation">.</span>server <span class="token keyword">import</span> HTTPServer<span class="token punctuation">,</span> SimpleHTTPRequestHandler</span>
<span class="line"><span class="token keyword">import</span> os</span>
<span class="line"><span class="token keyword">import</span> sys</span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">MyHTTPRequestHandler</span><span class="token punctuation">(</span>SimpleHTTPRequestHandler<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">def</span> <span class="token function">do_GET</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">        self<span class="token punctuation">.</span>send_response<span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span></span>
<span class="line">        self<span class="token punctuation">.</span>send_header<span class="token punctuation">(</span><span class="token string">&#39;Content-type&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;text/html; charset=UTF-8&#39;</span><span class="token punctuation">)</span></span>
<span class="line">        self<span class="token punctuation">.</span>end_headers<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        html <span class="token operator">=</span> <span class="token triple-quoted-string string">&#39;&#39;&#39;</span>
<span class="line">        &lt;html&gt;</span>
<span class="line">            &lt;head&gt;</span>
<span class="line">                &lt;meta charset=&quot;UTF-8&quot;&gt;</span>
<span class="line">            &lt;/head&gt;</span>
<span class="line">            &lt;body&gt;</span>
<span class="line">                &lt;h1&gt;🐳 Hello from Docker!&lt;/h1&gt;</span>
<span class="line">                &lt;p&gt;このページはDockerコンテナ内で動いています。&lt;/p&gt;</span>
<span class="line">            &lt;/body&gt;</span>
<span class="line">        &lt;/html&gt;</span>
<span class="line">        &#39;&#39;&#39;</span></span>
<span class="line">        self<span class="token punctuation">.</span>wfile<span class="token punctuation">.</span>write<span class="token punctuation">(</span>html<span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span></span>
<span class="line">    port <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>environ<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;PORT&#39;</span><span class="token punctuation">,</span> <span class="token number">8080</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    server <span class="token operator">=</span> HTTPServer<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token string">&#39;0.0.0.0&#39;</span><span class="token punctuation">,</span> port<span class="token punctuation">)</span><span class="token punctuation">,</span> MyHTTPRequestHandler<span class="token punctuation">)</span></span>
<span class="line">    </span>
<span class="line">    <span class="token keyword">try</span><span class="token punctuation">:</span></span>
<span class="line">        server<span class="token punctuation">.</span>serve_forever<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">except</span> KeyboardInterrupt<span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;\\nShutting down server...&quot;</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">finally</span><span class="token punctuation">:</span></span>
<span class="line">        server<span class="token punctuation">.</span>server_close<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Server stopped&quot;</span><span class="token punctuation">)</span></span>
<span class="line">        sys<span class="token punctuation">.</span>exit<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2. Dockerfileを作成</strong></p><div class="language-Dockerfile line-numbers-mode" data-highlighter="prismjs" data-ext="Dockerfile"><pre><code><span class="line"># Dockerfile</span>
<span class="line">FROM python:3.13</span>
<span class="line"></span>
<span class="line"># 作業ディレクトリを設定</span>
<span class="line">WORKDIR /app</span>
<span class="line"></span>
<span class="line"># アプリケーションファイルをコピー</span>
<span class="line">COPY main.py .</span>
<span class="line"></span>
<span class="line"># ポートを公開</span>
<span class="line">EXPOSE 8080</span>
<span class="line"></span>
<span class="line"># アプリケーションを起動</span>
<span class="line">CMD [&quot;python&quot;, &quot;main.py&quot;]</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3. イメージをビルドして実行</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># イメージビルド</span></span>
<span class="line"><span class="token function">docker</span> build <span class="token parameter variable">-t</span> simple-web-<span class="token operator">&lt;</span>user name<span class="token operator">&gt;</span> <span class="token builtin class-name">.</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># コンテナ実行（ポートマッピング付き）</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">8080</span>:8080 simple-web-<span class="token operator">&lt;</span>user name<span class="token operator">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="動作確認-1" tabindex="-1"><a class="header-anchor" href="#動作確認-1"><span>✅ 動作確認</span></a></h3><p>ブラウザで <code>http://localhost:8080</code> にアクセスし、Webページが表示されることを確認。</p><h3 id="解説-1" tabindex="-1"><a class="header-anchor" href="#解説-1"><span>💡 解説</span></a></h3><ul><li><code>python:3.13</code>: Python環境のベースイメージ</li><li><code>WORKDIR /app</code>: 以降の作業ディレクトリを設定</li><li><code>COPY app.py .</code>: ローカルのapp.pyをコンテナの現在位置にコピー</li><li><code>-p 8080:8080</code>: ホストのポート8080をコンテナのポート8080にマッピング</li></ul><h2 id="dockerfileベストプラクティス" tabindex="-1"><a class="header-anchor" href="#dockerfileベストプラクティス"><span>Dockerfileベストプラクティス</span></a></h2><h3 id="_1-軽量なベースイメージを選択" tabindex="-1"><a class="header-anchor" href="#_1-軽量なベースイメージを選択"><span>1. 軽量なベースイメージを選択</span></a></h3><div class="language-Dockerfile line-numbers-mode" data-highlighter="prismjs" data-ext="Dockerfile"><pre><code><span class="line"># 良い例: 軽量版を使用</span>
<span class="line">FROM python:3.13-slim</span>
<span class="line"></span>
<span class="line"># 避けるべき例: フルサイズ版</span>
<span class="line">FROM python:3.13</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-レイヤー数を最適化" tabindex="-1"><a class="header-anchor" href="#_2-レイヤー数を最適化"><span>2. レイヤー数を最適化</span></a></h3><div class="language-Dockerfile line-numbers-mode" data-highlighter="prismjs" data-ext="Dockerfile"><pre><code><span class="line"># 良い例: RUNを結合</span>
<span class="line">RUN apt-get update &amp;&amp; \\</span>
<span class="line">    apt-get install -y curl &amp;&amp; \\</span>
<span class="line">    apt-get clean &amp;&amp; \\</span>
<span class="line">    rm -rf /var/lib/apt/lists/*</span>
<span class="line"></span>
<span class="line"># 避けるべき例: 個別のRUN</span>
<span class="line">RUN apt-get update</span>
<span class="line">RUN apt-get install -y curl</span>
<span class="line">RUN apt-get clean</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-キャッシュを効率的に活用" tabindex="-1"><a class="header-anchor" href="#_3-キャッシュを効率的に活用"><span>3. キャッシュを効率的に活用</span></a></h3><div class="language-Dockerfile line-numbers-mode" data-highlighter="prismjs" data-ext="Dockerfile"><pre><code><span class="line"># 良い例: 変更頻度の低いものを先に</span>
<span class="line">COPY requirements.txt .</span>
<span class="line">RUN pip install -r requirements.txt</span>
<span class="line">COPY . .</span>
<span class="line"></span>
<span class="line"># 避けるべき例: すべてを一度にコピー</span>
<span class="line">COPY . .</span>
<span class="line">RUN pip install -r requirements.txt</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-セキュリティを考慮" tabindex="-1"><a class="header-anchor" href="#_4-セキュリティを考慮"><span>4. セキュリティを考慮</span></a></h3><div class="language-Dockerfile line-numbers-mode" data-highlighter="prismjs" data-ext="Dockerfile"><pre><code><span class="line"># 非rootユーザーで実行</span>
<span class="line">RUN useradd -m appuser</span>
<span class="line">USER appuser</span>
<span class="line"></span>
<span class="line"># 機密情報をハードコードしない</span>
<span class="line">ENV DATABASE_URL=\${DATABASE_URL}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ハンズオン3-実用的なwebアプリケーショ" tabindex="-1"><a class="header-anchor" href="#ハンズオン3-実用的なwebアプリケーショ"><span>ハンズオン3: 実用的なWebアプリケーショ</span></a></h2><h3 id="目標-2" tabindex="-1"><a class="header-anchor" href="#目標-2"><span>🎯 目標</span></a></h3><ul><li>依存関係を含む実用的なWebアプリケーションのコンテナを作成します。</li><li>ベストプラクティスに則さないポイントを修正して効率的なDockerfileにリファクタリングする。</li></ul><p><strong>1. 要件ファイルをgitから取得</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">git clone https://github.com/tsuyotech-meetup/bootcamp-docker-sample.git</span>
<span class="line">cd bootcamp-docker-sample</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2. ビルドと実行</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># イメージビルド</span></span>
<span class="line"><span class="token function">docker</span> build <span class="token parameter variable">-t</span> flask-app-before <span class="token builtin class-name">.</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># コンテナ実行</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">5000</span>:5000 flask-app-before</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="動作確認-2" tabindex="-1"><a class="header-anchor" href="#動作確認-2"><span>✅ 動作確認</span></a></h3><ol><li>ブラウザで <code>http://localhost:5000</code> にアクセス</li><li>ページの訪問回数が増加することを確認</li></ol><h3 id="現在のdockerfileの問題点" tabindex="-1"><a class="header-anchor" href="#現在のdockerfileの問題点"><span>⚠️ 現在のDockerfileの問題点</span></a></h3><p>GitHubから取得したコードを確認し、以下の問題を見つけて修正してください：</p><p><strong>問題1: キャッシュ効率が悪い</strong></p><ul><li>依存関係のインストールが毎回実行される</li><li>アプリケーションコードの変更時も依存関係が再インストールされる</li></ul><p><strong>問題2: セキュリティリスク</strong></p><ul><li>rootユーザーでアプリケーションが実行される</li><li>不要なファイルがコンテナイメージに含まれる</li></ul><p><strong>問題3: イメージサイズが大きい</strong></p><ul><li>フルサイズのPythonイメージを使用</li><li>開発用の依存関係も含まれている</li></ul><h3 id="改善効果の測定" tabindex="-1"><a class="header-anchor" href="#改善効果の測定"><span>🔍 改善効果の測定</span></a></h3><p>修正前後でイメージサイズとビルド時間を比較してみましょう：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># イメージサイズの確認</span></span>
<span class="line"><span class="token function">docker</span> images flask-app-before</span>
<span class="line"><span class="token function">docker</span> images flask-app-after</span>
<span class="line"></span>
<span class="line"><span class="token comment"># ビルド時間の測定</span></span>
<span class="line"><span class="token function">time</span> <span class="token function">docker</span> build <span class="token parameter variable">-t</span> flask-app-after <span class="token builtin class-name">.</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="改善チャレンジ" tabindex="-1"><a class="header-anchor" href="#改善チャレンジ"><span>🤔 改善チャレンジ</span></a></h3><p>まずは自分で改善版Dockerfileを作成してみてください！</p><details class="hint-container details"><summary>解答例を見る</summary><p><strong>改善版Dockerfileの例</strong></p><div class="language-Dockerfile line-numbers-mode" data-highlighter="prismjs" data-ext="Dockerfile"><pre><code><span class="line"># 改善1: 軽量版イメージを使用</span>
<span class="line">FROM python:3.13-slim</span>
<span class="line"></span>
<span class="line"># 改善2: 作業ディレクトリを最初に設定</span>
<span class="line">WORKDIR /app</span>
<span class="line"></span>
<span class="line"># 改善3: 要件ファイルを先にコピー（キャッシュ効率化）</span>
<span class="line">COPY ./app/requirements.txt .</span>
<span class="line"></span>
<span class="line"># 改善4: 必要最小限のパッケージのみインストール</span>
<span class="line">RUN apt-get update &amp;&amp; \\</span>
<span class="line">    apt-get install -y --no-install-recommends curl &amp;&amp; \\</span>
<span class="line">    pip install --no-cache-dir -r requirements.txt &amp;&amp; \\</span>
<span class="line">    apt-get clean &amp;&amp; \\</span>
<span class="line">    rm -rf /var/lib/apt/lists/*</span>
<span class="line"></span>
<span class="line"># 改善5: アプリケーションファイルをコピー</span>
<span class="line">COPY app/ ./app/</span>
<span class="line"></span>
<span class="line"># 改善6: 非rootユーザーを作成</span>
<span class="line">RUN adduser --disabled-password --no-create-home appuser &amp;&amp; \\</span>
<span class="line">    chown -R appuser:appuser /app</span>
<span class="line">USER appuser</span>
<span class="line"></span>
<span class="line"># 改善7: ポート公開</span>
<span class="line">EXPOSE 5000</span>
<span class="line"></span>
<span class="line"># 改善8: ヘルスチェック追加</span>
<span class="line">HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\</span>
<span class="line">    CMD curl -f http://localhost:5000/health || exit 1</span>
<span class="line"></span>
<span class="line"># アプリケーション起動</span>
<span class="line">CMD [&quot;python&quot;, &quot;app/main.py&quot;]</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>.dockerignoreファイル</strong></p><div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini"><pre><code><span class="line"><span class="token comment"># .dockerignore</span></span>
<span class="line">__pycache__</span>
<span class="line">*.pyc</span>
<span class="line">*.pyo</span>
<span class="line">*.pyd</span>
<span class="line">.Python</span>
<span class="line">.git</span>
<span class="line">.pytest_cache</span>
<span class="line">.venv</span>
<span class="line">node_modules</span>
<span class="line">README.md</span>
<span class="line">.gitignore</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>主な改善点：</strong></p><ol><li><strong>軽量化</strong>: <code>python:3.13-slim</code>を使用してサイズ削減</li><li><strong>キャッシュ効率</strong>: requirements.txtを先にコピー</li><li><strong>セキュリティ</strong>: 非rootユーザー（appuser）で実行</li><li><strong>不要ファイル除外</strong>: .dockerignoreで最適化</li></ol></details><h2 id="ハンズオン4-究極の最適化-distroless-マルチステージビルド" tabindex="-1"><a class="header-anchor" href="#ハンズオン4-究極の最適化-distroless-マルチステージビルド"><span>ハンズオン4: 究極の最適化 - Distroless &amp; マルチステージビルド</span></a></h2><h3 id="目標-3" tabindex="-1"><a class="header-anchor" href="#目標-3"><span>🎯 目標</span></a></h3><ul><li>マルチステージビルドによる超軽量イメージの作成</li><li>Distrolessイメージによるセキュリティ強化</li><li>プロダクション品質のコンテナ構築技術の習得</li></ul><h3 id="実装-2" tabindex="-1"><a class="header-anchor" href="#実装-2"><span>📝 実装</span></a></h3><p><strong>1. 従来版とのイメージサイズ比較準備</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># ハンズオン3の改善版イメージサイズを確認</span></span>
<span class="line"><span class="token function">docker</span> images flask-app-after</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2. マルチステージ + Distroless Dockerfileを作成</strong></p><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker"><pre><code><span class="line"><span class="token comment"># Dockerfile.distroless</span></span>
<span class="line"><span class="token comment"># ============================================</span></span>
<span class="line"><span class="token comment"># Stage 1: ビルドステージ</span></span>
<span class="line"><span class="token comment"># ============================================</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> python:3.11-slim <span class="token keyword">AS</span> builder</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 依存関係をシステムにインストール</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> app/requirements.txt .</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> pip install --no-cache-dir -r requirements.txt</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment"># ============================================</span></span>
<span class="line"><span class="token comment"># Stage 2: 実行ステージ（Distroless）</span></span>
<span class="line"><span class="token comment"># ============================================</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> gcr.io/distroless/python3-debian12:latest</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># site-packagesを直接コピー</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">builder</span></span> /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># アプリケーションファイルをコピー</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--chown</span><span class="token punctuation">=</span><span class="token string">nonroot:nonrootp</span></span> app/ /app/</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 環境変数設定</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENV</span> PYTHONPATH=<span class="token string">&quot;/usr/local/lib/python3.11/site-packages&quot;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 作業ディレクトリ設定</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 非特権ユーザーで実行</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">USER</span> nonroot:nonroot</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># ポート公開</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">EXPOSE</span> 5000</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># アプリケーション起動</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;main.py&quot;</span>]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2. イメージビルドと比較</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 従来版のサイズ確認</span></span>
<span class="line"><span class="token function">docker</span> images flask-app-after</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Distroless版をビルド</span></span>
<span class="line"><span class="token function">docker</span> build <span class="token parameter variable">-f</span> Dockerfile.distroless <span class="token parameter variable">-t</span> flask-app-distroless <span class="token builtin class-name">.</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># サイズ比較</span></span>
<span class="line"><span class="token function">docker</span> images flask-app-after <span class="token parameter variable">--format</span> <span class="token string">&quot;table {{.Repository}}<span class="token entity" title="\\t">\\t</span>{{.Tag}}<span class="token entity" title="\\t">\\t</span>{{.Size}}&quot;</span></span>
<span class="line"><span class="token function">docker</span> images flask-app-distroless <span class="token parameter variable">--format</span> <span class="token string">&quot;table {{.Repository}}<span class="token entity" title="\\t">\\t</span>{{.Tag}}<span class="token entity" title="\\t">\\t</span>{{.Size}}&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3. 実行と動作確認</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Distroless版を実行</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">5000</span>:5000 flask-app-distroless</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="動作確認-3" tabindex="-1"><a class="header-anchor" href="#動作確認-3"><span>✅ 動作確認</span></a></h3><ol><li>ブラウザで <code>http://localhost:5000</code> にアクセス</li></ol><h3 id="解説-2" tabindex="-1"><a class="header-anchor" href="#解説-2"><span>💡 解説</span></a></h3><p><strong>マルチステージビルドの利点:</strong></p><ul><li><strong>ビルド環境と実行環境の分離</strong>: 開発ツールを実行イメージに含めない</li><li><strong>イメージサイズの最小化</strong>: 必要なファイルのみを実行ステージにコピー</li><li><strong>セキュリティ向上</strong>: 攻撃対象の最小化</li></ul><p><strong>Distrolessイメージの特徴:</strong></p><ul><li><strong>シェルなし</strong>: 攻撃者がシェルアクセスできない</li><li><strong>パッケージマネージャーなし</strong>: 追加ソフトウェアをインストールできない</li><li><strong>最小限のファイルシステム</strong>: アプリケーション実行に必要な最小限のみ</li><li><strong>非rootユーザー</strong>: デフォルトで非特権ユーザーで実行</li></ul><h3 id="セキュリティ強化の確認" tabindex="-1"><a class="header-anchor" href="#セキュリティ強化の確認"><span>🛡️ セキュリティ強化の確認</span></a></h3><p><strong>コンテナ内への侵入不可能性をテスト</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 標準イメージ: シェルアクセス可能</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--rm</span> flask-app-after <span class="token function">bash</span></span>
<span class="line"><span class="token comment"># → シェルが起動する</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Distrolessイメージ: シェルアクセス不可</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--rm</span> flask-app-distroless <span class="token function">bash</span></span>
<span class="line"><span class="token comment"># → エラーが発生（シェルが存在しない）</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>脆弱性スキャンの実践</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Docker Scout を使用した脆弱性スキャン（Docker Desktop必要）</span></span>
<span class="line"><span class="token function">docker</span> scout cves flask-app-after</span>
<span class="line"><span class="token function">docker</span> scout cves flask-app-distroless</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="制限事項と注意点" tabindex="-1"><a class="header-anchor" href="#制限事項と注意点"><span>⚠️ 制限事項と注意点</span></a></h3><p><strong>Distrolessの制約:</strong></p><ul><li>デバッグが困難（シェルアクセス不可）</li><li>トラブルシューティング時の調査方法が限定的</li><li>一部のライブラリが動作しない可能性</li></ul><p><strong>デバッグ方法:</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># デバッグ用にビルドステージのイメージを作成</span></span>
<span class="line"><span class="token function">docker</span> build <span class="token parameter variable">--target</span> builder <span class="token parameter variable">-t</span> flask-debug <span class="token builtin class-name">.</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># ビルドステージでデバッグ</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-it</span> flask-debug <span class="token function">bash</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="よくある問題と解決方法" tabindex="-1"><a class="header-anchor" href="#よくある問題と解決方法"><span>よくある問題と解決方法</span></a></h2><h3 id="問題1-ポート8080が既に使用中" tabindex="-1"><a class="header-anchor" href="#問題1-ポート8080が既に使用中"><span>問題1: ポート8080が既に使用中</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 使用中のポートを確認</span></span>
<span class="line"><span class="token function">netstat</span> <span class="token parameter variable">-tulpn</span> <span class="token operator">|</span> <span class="token function">grep</span> :8080</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 別のポートを使用</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">8081</span>:8080 simple-web-<span class="token operator">&lt;</span>user name<span class="token operator">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="問題2-イメージが見つからない" tabindex="-1"><a class="header-anchor" href="#問題2-イメージが見つからない"><span>問題2: イメージが見つからない</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 作成したイメージを確認</span></span>
<span class="line"><span class="token function">docker</span> images</span>
<span class="line"></span>
<span class="line"><span class="token comment"># タグ名を正確に指定</span></span>
<span class="line"><span class="token function">docker</span> run hello-docker-yourname</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="問題3-コンテナが停止しない" tabindex="-1"><a class="header-anchor" href="#問題3-コンテナが停止しない"><span>問題3: コンテナが停止しない</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 強制停止</span></span>
<span class="line"><span class="token function">docker</span> <span class="token function">ps</span>  <span class="token comment"># 実行中のコンテナIDを確認</span></span>
<span class="line"><span class="token function">docker</span> stop <span class="token operator">&lt;</span>container_id<span class="token operator">&gt;</span></span>
<span class="line"><span class="token function">docker</span> <span class="token function">kill</span> <span class="token operator">&lt;</span>container_id<span class="token operator">&gt;</span>  <span class="token comment"># 強制終了</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="学習チェックリスト" tabindex="-1"><a class="header-anchor" href="#学習チェックリスト"><span>学習チェックリスト</span></a></h2><ul><li>[ ] ハンズオン1: Hello Worldが実行できた</li><li>[ ] ハンズオン2: Webページにアクセスできた</li><li>[ ] ハンズオン3: 問題点を3つ以上発見できた</li><li>[ ] <strong>ハンズオン4: Distrolessイメージが実行できた</strong></li><li>[ ] <strong>マルチステージビルドでイメージサイズが大幅削減された</strong></li><li>[ ] <strong>シェルアクセスが不可能なことを確認できた</strong></li><li>[ ] <strong>脆弱性数の減少を確認できた</strong></li></ul><h3 id="達成レベル" tabindex="-1"><a class="header-anchor" href="#達成レベル"><span>達成レベル</span></a></h3><ul><li><strong>初級</strong>: ハンズオン1-2完了</li><li><strong>中級</strong>: ハンズオン3完了（問題解決能力）</li><li><strong>上級</strong>: ハンズオン4完了（プロダクション品質）</li></ul><h3 id="次のステップ" tabindex="-1"><a class="header-anchor" href="#次のステップ"><span>次のステップ</span></a></h3>`,112)),n("ul",null,[n("li",null,[a(t,{to:"/dev/container/02_compose_basic.html"},{default:u(()=>s[0]||(s[0]=[e("第2部: Docker Compose基礎編")])),_:1}),s[1]||(s[1]=e(" - 複数コンテナの連携を学ぼう"))])])])}const f=c(v,[["render",k]]),y=JSON.parse('{"path":"/dev/container/01_dockerfile_basic.html","title":"Dockerfile基礎編 - 最初のコンテナを作ってみよう","lang":"ja-JP","frontmatter":{"footer":"MIT Licensed","title":"Dockerfile基礎編 - 最初のコンテナを作ってみよう","description":"Dockerfileの基本的な書き方を学び、実際にWebアプリケーションのコンテナを作成します"},"git":{"updatedTime":1748117622000,"contributors":[{"name":"YUKI_ISHITSUKA","username":"","email":"goegoe0212@outlook.jp","commits":6}],"changelog":[{"hash":"d9ec45a8dd3e12a1b611f951d01b3e9b27ee382a","time":1748117622000,"email":"goegoe0212@outlook.jp","author":"YUKI_ISHITSUKA","message":"fix: よくある問題と解決方法のセクションを整理し、重複を削除"},{"hash":"8282d0d195c09166af6934a9f5b3dcc8a47f2a34","time":1748117450000,"email":"goegoe0212@outlook.jp","author":"YUKI_ISHITSUKA","message":"feat: マルチステージビルドとDistrolessイメージによる最適化を追加"},{"hash":"38342fee637d48436f9077dcb77d09d5127ed4dd","time":1748115387000,"email":"goegoe0212@outlook.jp","author":"YUKI_ISHITSUKA","message":"feat: Dockerfileの改善とヘルスチェックの追加"},{"hash":"92928f6e020a297d5a3a48d2bf8adff0c4c93014","time":1748114692000,"email":"goegoe0212@outlook.jp","author":"YUKI_ISHITSUKA","message":"fix: コードブロックの言語指定を修正"},{"hash":"dea0e0143aa5a01697dae967fd4e50a00db0f4d8","time":1748114053000,"email":"goegoe0212@outlook.jp","author":"YUKI_ISHITSUKA","message":"feat: Dockerfile基礎編にハンズオンセクションを追加"},{"hash":"9eca0845831df7837363d09cfa766eabff1900e4","time":1748096928000,"email":"goegoe0212@outlook.jp","author":"YUKI_ISHITSUKA","message":"feat: Dockerfile基礎編の初期コンテンツを追加"}]},"filePathRelative":"dev/container/01_dockerfile_basic.md"}');export{f as comp,y as data};
