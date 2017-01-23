###Init
```shell
git clone [--recursive] git@github.com:hwangzhiming/smart-emojis.git
cd smart-emojis
git submodule update --init --recursive
npm install
gulp publish
```
###Usages
```html
<div>{{message | emoji:'//your_base_url.com'}}</div>
```