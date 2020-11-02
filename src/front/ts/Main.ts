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

        this.view = new ViewMainPage(this.myFramework);
    };

    handleEvent(evt: Event): void {
        console.log ("se hizo click");
        // console.log (this);
        
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
                    console.log(deviceListId.dataset);

                    let checked;
                    try{
                        let dimerEnabled = <HTMLInputElement> this.myFramework.getElementById("dimerizable");
                        checked = dimerEnabled.checked ? 1:0;
                    }catch (e) {
                        console.log("Error: ", e);
                        checked= 0;
                    }

                    let newDevice = {
                        name: name.value,
                        descripcion: descripcion.value,
                        state: 1,
                        type: typeLight.checked ? 1 : typeWindow.checked ? 1 : 0,
                        dimerized:  checked
                    };

                    // console.log(newDevice);
                    this.myFramework.requestPOST(`http://10.0.0.50:8005/api/devices/`, newDevice, this);
                    this.clearAcordion(true);
                break;
            case "cancel":
                console.log(btnB);
                this.clearAcordion(false);
                break;
            case "id_disp":
                console.log(btnB);
                break;
            default:
                    console.log('Dev click');
                    let estado: Number = this.view.getSwitchStateById(btnB.id);

                    let data = {"id" : `${btnB.id}`, "state": estado };

                    console.log(estado);
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
    }

    handleGETResponse(status: number, response: string): void {
        // throw new Error("Method not implemented.");
        // console.log(response);
        // let datas = response;
        var jsonResponse = JSON.parse(response);
        console.log(jsonResponse["data"]);

        // let data: Array<DeviceInt> = JSON.parse (response);
        let data: Array<DeviceInt> = jsonResponse["data"];
        // console.log(data);
        this.view.showDevices(data);
        data.forEach(element => {
            let d:HTMLElement = this.myFramework.getElementById(`${element.id}`);
            d.addEventListener("click", this);
        });
    };

    handlePOSTResponse(status: number, response: string): void {
        console.log("Status" + status);
        console.log(response);
    }

    handlePUTResponse(status: number, response: string): void {
        console.log("Status" + status);
        console.log(response);
    }
}

//funcion anonima: no tiene nombre
window.onload = () => {
    let  _main: Main = new Main();
    _main.main();
};
