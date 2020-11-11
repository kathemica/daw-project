class ViewMainPage {

    private myFramework:  MyFramework;
    private main:  Main;

    constructor (myFramework: MyFramework, maim: Main){
        this.myFramework = myFramework;
    }

    showDevices(list: DeviceInt[]):void{
        let elements:HTMLElement = this.myFramework.getElementById("deviceListId");

        list.forEach(device => {
            let image:string = (device.type === 0)? "lightbulb.png" :  "window.png" ;
            let checked:string = (device.state === 1)? "checked" :  "" ;
            let dimer: string = (device.dimerized === 1)? `<div class='col s12 flow-text  center'><a href='#!'><p class='range-field'><input type='range' id='dim_${device.id}' min='0' max='100' parent_id='${device.id}' value='${device.dimer_value}' /></p></a></div>`: '';

            elements.innerHTML += `
            <li class="collection-item avatar mca-always-visible">
                <div class="row" style="margin-bottom: 0px">
                    <div class="col l4 m2 s3 white">
                        <img src= "static/images/${image}" alt="${device.name}" class="circle">
                        <span class="title">${device.name}</span>
                        <p>${device.descripcion}</p>
                    </div>                     
                                
                    <div class="col l5 m2 s3 white ">
                            <div class="row" style="margin-bottom: 0px"> 
                                <div class="col s12 flow-text center">
                                   <a href="#!" >
                                        <div class="switch">
                                            <label>
                                                Off
                                                <input id="${device.id}" type="checkbox" ${checked}>
                                                <span class="lever"></span>
                                                On
                                            </label>
                                        </div>
                                    </a>     
                                </div>
                                ${dimer}                                                                                                                                 
                        </div>                        
                    </div>   
                    
                    <div class="col l1 white ">
                         <a href="#!" action= "delete" id="del_${device.id}" parent_id="${device.id}" class="secondary-content tooltipped" data-delay="50" data-tooltip="I am a tooltip"><i class="material-icons" >delete_forever</i></a></li> 
                    </div>
                                    
                </div>          
            </li>`;
        });
    };

    getSwitchStateById(id: string): Number{
        let element: HTMLElement =  this.myFramework.getElementById(id);
        let input: HTMLInputElement = <HTMLInputElement> element;

        return input.checked? 1:0;
    }
}