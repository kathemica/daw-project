/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main frontend file (where the logic is)
=============================================================================*/
// import { User } from "./User";
// import { MyFramework } from "./MyFramework";

interface DeviceInt{
    id: string;
    name: string;
    description: string
    state: string;
    type: string
}

class Main implements EventListenerObject, GETResponseListener, POSTResponseListener{
    
   
    myFramework: MyFramework;
    counter: number;
    view: ViewMainPage;

    main(): void {
        console.log("soy un mensaje");
        let usuarios: Array<User>;
        usuarios = new Array<User>();
        usuarios.push(new User(1, "kathe", "kathemica@gmail.com"));
        usuarios.push(new User(2, "estefania", "email2"));
        usuarios.push(new User(3, "aguirre", "email3"));

        this.mostrarUsers(usuarios);

        this.myFramework = new MyFramework();

        //myFramework.configClick ("boton", this.evento);

        let btn:HTMLElement = document.getElementById("boton");
        // this.myf.configEventLister ("click", "boton", this);
        btn.addEventListener("click", this);
        // btn.textContent = "Prueba de TS";
        // // btn.addEventListener ("click", this.evento);
        // btn.addEventListener("click",()=>{ alert("Evento!"); });
        this.counter = 0;
        this.myFramework.requestGET("devices.txt",this);
        this.view =  new ViewMainPage(this.myFramework);
        
    }

    mostrarUsers(users:Array<User>): void {
        // for(let i in users){
        //     users[i].printInfo();
        // }

        users.forEach(element => {
            element.printInfo();
        });
    };

    // evento (ev: Event): void {
    //     console.log ("se hizo click");
    // }

    handleEvent(evt: Event): void {
        console.log ("se hizo click");
        console.log (this);
        
        let btnB:HTMLElement = this.myFramework.getElementByEvent(evt);

        if (btnB.id === "boton"){
            
            this.counter++;
            btnB.textContent = `Click ${this.counter}`; //cambia el nombre del objeto
            console.log(btnB);
        }else{
            console.log('Dev click');
            let estado: Boolean = this.view.getSwitchStateById(btnB.id);

            let data = {"id" : `${btnB.id}`, "estado": estado };
            console.log(estado);
            this.myFramework.requestPOST ("https://cors-anywhere.herokuapp.com/https://postman-echo.com/post", data, this);
        }
    }; 

    handleGETResponse(status: number, response: string): void {
        // throw new Error("Method not implemented.");
        let data: Array<DeviceInt> = JSON.parse (response);
        console.log(data);
        this.view.showDevices(data);
        data.forEach(element => {
            let d:HTMLElement = this.myFramework.getLementById(`dev_${element.id}`);
            d.addEventListener("click", this);
        });
    };

    handlePOSTResponse(status: number, response: string): void {
        console.log("Status" + status);
        console.log(response);
    }
}

//funcion anonima: no tiene nombre
window.onload = () => {
    let  _main: Main = new Main();

    _main.main();
}
//=======[ Settings, Imports & Data ]==========================================

// let user = "TypesScript Users!";

// //=======[ Main module code ]==================================================

// function greeter(person) {
//     return "Hello, " + person;
//  }
 
//  document.body.innerHTML = greeter(user);

//=======[ End of file ]=======================================================
