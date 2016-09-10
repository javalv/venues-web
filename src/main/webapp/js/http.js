export class Http{
    getJSON(url) {
        var promise = new Promise(function(resolve, reject){
            var client = new XMLHttpRequest();
            client.open("GET", url);
            client.onreadystatechange = handler;
            client.responseType = "json";
            client.setRequestHeader("Accept", "application/json");
            client.setRequestHeader("Content-Type", "application/json");
            client.send();
            function handler() {
                if(this.readyState==4){
                    if (this.status === 200) {
                        resolve(this.response);  //成功则触发resolve回调
                    } else {
                        reject(new Error(this.statusText));  //失败则触发reject回调
                    }
                }

            }
        });
        return promise;
    }
}
