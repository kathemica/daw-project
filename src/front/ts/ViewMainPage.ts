class ViewMainPage {

    private myFramework:  MyFramework;

    constructor (myFramework: MyFramework){
        this.myFramework = myFramework;
    }

    showDevices(list: DeviceInt[]):void{
        let elements:HTMLElement = this.myFramework.getLementById("deviceListId");



        list.forEach(device => {
            let image:string = (device.type === "0")? "lightbulb.png" :  "window.png" ;
            let checked:string = (device.state === "1")? "checked" :  "" ;


            elements.innerHTML += `<li class="collection-item avatar">
                <img src= "static/images/${image}" alt="${device.name}" class="circle">
                <span class="title">${device.name}</span>
                <p>${device.description}</p>
                <a href="#!" class="secondary-content">
                    
                    <div class="switch">
                        <label>
                            Off
                            <input id="dev_${device.id}" type="checkbox" ${checked}>
                            <span class="lever"></span>
                            On
                        </label>
                    </div>
                </a>
            </li>`;
            
        });
    };

    getSwitchStateById(id: string): Boolean{
        let element: HTMLElement =  this.myFramework.getLementById(id);
        let input: HTMLInputElement = <HTMLInputElement> element;

        return input.checked;
    }
}