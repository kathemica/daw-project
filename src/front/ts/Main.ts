/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main frontend file (where the logic is)
 * ADAPTED BY: Ing. Katherine Aguirre
=============================================================================*/

interface DeviceInt{
    id: string;
    name: string;
    descripcion: string
    state: number;
    type: number,
    dimerized: number,
    dimer_value: number
}

class Main implements EventListenerObject, GETResponseListener, POSTResponseListener, PUTResponseListener{
    myFramework: MyFramework;
    view: ViewMainPage;

    main(): void {
        this.myFramework = new MyFramework();

        let elem = document.querySelector('.collapsible.popout');

        M.Collapsible.init(elem, {
            accordion: false
        });

        let btnIdDisp:HTMLElement = document.getElementById("id_disp");
        btnIdDisp.hidden=true;

        let btnSave:HTMLElement = document.getElementById("save");
        btnSave.addEventListener("click", this);

        let btnCancel:HTMLElement = document.getElementById("cancel");
        btnCancel.addEventListener("click", this);

        this.myFramework.requestGET("http://10.0.0.50:8005/api/devices",this);

        this.view = new ViewMainPage(this.myFramework, this);
    };

    handleEvent(evt: Event): void {
        let btnB:HTMLElement = this.myFramework.getElementByEvent(evt);

        switch (btnB.id) {
            case "save":
                    //obteniendo los datos del dispositivo a agregar
                    let id_disp = <HTMLInputElement> this.myFramework.getElementById("id_disp");
                    let name = <HTMLInputElement> this.myFramework.getElementById("name");
                    let descripcion = <HTMLInputElement> this.myFramework.getElementById("descripcion");
                    let typeLight = <HTMLInputElement> this.myFramework.getElementById("typeLight");
                    let typeWindow = <HTMLInputElement> this.myFramework.getElementById("typeWindow");

                    let deviceListId = <HTMLInputElement> this.myFramework.getElementById("deviceListId");

                    let checked;
                    try{
                        let dimerEnabled = <HTMLInputElement> this.myFramework.getElementById("dimerizable");
                        checked = dimerEnabled.checked ? 1:0;
                    }catch (e) {
                        checked= 0;
                    }

                    let newDevice = {
                        name: name.value,
                        descripcion: descripcion.value,
                        state: 0,
                        type: typeLight.checked ? 0 : typeWindow.checked ? 1 : 0,
                        dimerized:  checked
                    };

                    this.myFramework.requestPOST(`http://10.0.0.50:8005/api/devices/`, newDevice, this);
                break;
            case "cancel":
                console.log(btnB);
                this.clearAcordion(false);
                break;
            case "id_disp":
                console.log(btnB);
                break;
            default:
                    let estado: Number = this.view.getSwitchStateById(btnB.id);
                    let data = {"id" : `${btnB.id}`, "state": estado };

                    this.myFramework.requestPUT(`http://10.0.0.50:8005/api/devices/${btnB.id}`, data, this);
                break;
        };
    }; 

    clearAcordion(reload: boolean):void{
        let elem = document.querySelector('.collapsible.popout');
        M.Collapsible.getInstance(elem).close(0);
        (<HTMLInputElement>this.myFramework.getElementById("name")).value = "";
        (<HTMLInputElement>this.myFramework.getElementById("descripcion")).value = "";
        M.updateTextFields();

        reload? window.location.reload(false): null;
    };

    handleGETResponse(status: number, response: string): void {
        switch (status) {
            case 200:
                    var jsonResponse = JSON.parse(response);

                    let data: Array<DeviceInt> = jsonResponse["data"];
                    this.view.showDevices(data);
                    data.forEach(element => {
                        let d:HTMLElement = this.myFramework.getElementById(`${element.id}`);
                        d.addEventListener("click", this);
                    });

                    let inputs= document.getElementsByTagName("input");

                    for (var i = 0, length = inputs.length; i < length; i++) {
                        let input= inputs[i];
                        const id= input.getAttribute('parent_id');
                        if (id !== null){
                            input.addEventListener('click', () => {
                                let data = {"id" : `${id}`, "dimer_value": `${input.value}` };
                                this.myFramework.requestPUT(`http://10.0.0.50:8005/api/devices/${id}`, data, this);
                            }, true);
                        }
                    };

                    let anchors = document.getElementsByTagName("a");
                    for (let i = 0, length = anchors.length; i < length; i++) {
                        let anchor = anchors[i];
                        const action= anchor.getAttribute('action');

                        if (action !== null && action === "delete"){
                            // console.log(action);
                            const parent_id= anchor.getAttribute('parent_id');

                            anchor.addEventListener('click', () => {
                                this.myFramework.requestDELETE(`http://10.0.0.50:8005/api/devices/${parent_id}`, this);
                            }, true);
                        }
                    };
                break;
            case 400:
                    console.log(`Error [${status}]: `, response || "Conflicto");
                    M.toast({html: `El nombre no puede estar vacío!.`, classes: 'rounded'});
                break;
            case 409:
                    console.log(`Error [${status}]: `, response || "Conflicto");
                    M.toast({html: `Ya existe un dispositivo con ese nombre.`, classes: 'rounded'});
                break;
            case 500:
                    console.log(`Error [${status}]: `, response);
                    M.toast({html: `${status}: Internal Server Error.`, classes: 'rounded'});
                break;
            default:
                    console.log(`Error Desconocido [${status}]`, response);
                break;
        };
    };

    handlePOSTResponse(status: number, response: string): void {
        console.log("Status: " + status);
        console.log(response);
        switch (status) {
            case 200:
                    this.clearAcordion(true);
                break;
            case 400:
                    console.log(`Error [${status}]: `, response || "Conflicto");
                    M.toast({html: `El nombre no puede estar vacío!.`, classes: 'rounded'});
                break;
            case 409:
                    console.log(`Error [${status}]: `, response || "Conflicto");
                    M.toast({html: `Ya existe un dispositivo con ese nombre.`, classes: 'rounded'});
                break;
            case 500:
                    console.log(`Error [${status}]: `, response);
                    M.toast({html: `${status}: Internal Server Error.`, classes: 'rounded'});
                break;
            default:
                    console.log(`Error Desconocido [${status}]`, response);
                break;
        }
    }

    handlePUTResponse(status: number, response: string): void {
        console.log("Status" + status);
        console.log(response);

        switch (status) {
            case 200:
                break;
            case 403:
                    console.log(`Error [${status}]: `, response);
                    M.toast({html: `Error ${status}: ${response}`, classes: 'rounded'});
                break;
            case 500:
                    console.log(`Error [${status}]: `, response);
                    M.toast({html: `${status}: Internal Server Error.`, classes: 'rounded'});
                break;
            default:
                console.log(`Error Desconocido [${status}]`, response);
                M.toast({html: `Error [${status}]: ${response}`, classes: 'rounded'});
                break;
        }
    }

    handleDELETEResponse(status: number, response: string): void {
        console.log("Status" + status);
        console.log(response);

        switch (status) {
            case 200:
                    window.location.reload(false)
                break;
            case 403:
                    console.log(`Error [${status}]: `, response);
                    M.toast({html: `Error ${status}: ${response}`, classes: 'rounded'});
                break;
            case 500:
                    console.log(`Error [${status}]: `, response);
                    M.toast({html: `${status}: Internal Server Error.`, classes: 'rounded'});
                break;
            default:
                console.log(`Error Desconocido [${status}]`, response);
                break;
        }
    }
}

//funcion anonima: no tiene nombre
window.onload = () => {
    let  _main: Main = new Main();
    _main.main();
};
