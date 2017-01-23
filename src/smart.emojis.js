"use strict";
angular.module('smart.emojis', [])
    .filter('emoji', ['smart.emojis.list', (SupportedEmojis) => {
        const rEmojis = new RegExp(":(" + SupportedEmojis.join("|") + "):", "g");
        let filter = (input, baseUrl) => {
            return input.replace(rEmojis, function (match, text) {
                return  `<img class="emoji" src="${baseUrl}${text}.png" title=":${text}:"/>`;
            });
        };
        return filter;
    }]);