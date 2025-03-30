# nginx.config

```
daemon off;

http {
  server {
    listen       443 ssl;
    server_name  www.example.com;
    ssl_certificate      /path/to/cert/example.com+1.pem;
    ssl_certificate_key  /path/to/cert/example.com+1-key.pem;

    location / {
      proxy_pass  http://localhost:8086/;
    }
  }

  server {
    listen       443 ssl;
    server_name  api.example.com;
    ssl_certificate      /path/to/cert/example.com+1.pem;
    ssl_certificate_key  /path/to/cert/example.com+1-key.pem;

    location / {
      proxy_pass  http://localhost:8087/;
      add_header Access-Control-Allow-Origin https://www.example.com;
      add_header Access-Control-Allow-Credentials true;
      add_header Access-Control-Allow-Headers content-type;
    }
  }
}
```