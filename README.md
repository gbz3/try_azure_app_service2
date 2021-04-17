# try_azure_app_service2

## nodenv で node リスト最新化

```bash
$ git -C "$(nodenv root)"/plugins/node-build pull
...
 create mode 100644 share/node-build/10.24.1
 create mode 100644 share/node-build/12.22.1
 create mode 100644 share/node-build/14.16.1
 create mode 100644 share/node-build/15.14.0
$ nodenv install --list |grep ^14.16
14.16.0
$ nodenv versions
* 12.16.1 (set by /home/***/.anyenv/envs/nodenv/version)
  14.15.4
  14.15.5
  14.16.0
$ nodenv install 14.16.1
$
```

## node ローカルインストール

```bash
$ nodenv local 14.16.1
$ node -v
v14.16.1
$ npm -v
6.14.12
```
