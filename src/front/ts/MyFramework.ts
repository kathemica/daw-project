interface GETResponseListener {
    handleGETResponse(status: number, response: string): void;
}

interface POSTResponseListener {
    handlePOSTResponse(status: number, response: string): void;
}

interface PUTResponseListener {
    handlePUTResponse(status: number, response: string): void;
}

interface DELETEResponseListener {
    handleDELETEResponse(status: number, response: string): void;
}

class MyFramework{
    
    getElementById(id: string): HTMLElement{
        let elemento: HTMLElement;

        elemento = document.getElementById(id);

        return (elemento);
    };

    //se castea el event porque no es proppiamente un HTMLElement
    getElementByEvent(evt: Event): HTMLElement{
        return <HTMLElement> evt.target;
    };

    configClick(id:string,callback:any):void {
        let b:HTMLElement = document.getElementById(id);
        b.addEventListener("click",()=>{
            callback();
        });
    };

    requestGET(url:string, listener: GETResponseListener):void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();

        xhr.open('GET', url, true);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');

        try{
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        listener.handleGETResponse(xhr.status, xhr.responseText);
                    }else{
                        listener.handleGETResponse(xhr.status,null);
                    }
                }
            };
        }catch (e) {
            console.log("Warning: ", e)
        }


        xhr.send(null);
    };

    requestPUT(url:string,  data:object, listener: PUTResponseListener):void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();

        xhr.open('PUT', url, true);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    listener.handlePUTResponse(xhr.status, xhr.responseText);
                }else{
                    listener.handlePUTResponse(xhr.status, null);
                }
            }
        };

        xhr.send(JSON.stringify(data));
    };

    requestPOST(url:string, data:object, listener: POSTResponseListener):void {
        const dataJson= JSON.stringify(data);

        let xhr: XMLHttpRequest = new XMLHttpRequest();

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                     listener.handlePOSTResponse(xhr.status, xhr.responseText);
                }else{
                    listener.handlePOSTResponse(xhr.status,null);
                }
            }
        };

        xhr.send(dataJson);
    };

    requestDELETE(url:string, listener: DELETEResponseListener):void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();

        xhr.open('DELETE', url, true);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    listener.handleDELETEResponse(xhr.status, xhr.responseText);
                }else{
                    listener.handleDELETEResponse(xhr.status,null);
                }
            }
        };

        xhr.send(null);
    };

    configEventLister (event:string, id:string, listener:EventListenerObject):void {
        let b:HTMLElement = document.getElementById (id);
        b.addEventListener (event,listener);
    };
}