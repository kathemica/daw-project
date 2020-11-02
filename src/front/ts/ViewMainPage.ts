class ViewMainPage {

    private myFramework:  MyFramework;

    constructor (myFramework: MyFramework){
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
                    <div class="col l4 offset-l4 valign-wrapper">
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
                                <div>
                                    <input type="range" id="myRange">
                                </div>
                                                                                                                                
                        </div>                        
                    </div>                    
                </div>          
            </li>`;
        });

        var anchors = document.getElementsByTagName("a");
        for (var i = 0, length = anchors.length; i < length; i++) {
            var anchor = anchors[i];
            anchor.addEventListener('click', function() {
                console.log(this.get);
                // `this` refers to the anchor tag that's been clicked

                // let estado: Number = this.value;
                //
                // let data = {"id" : `${btnB.id}`, "state": estado };

                // console.log(estado);
                // this.myFramework.requestPUT(`http://10.0.0.50:8005/api/devices/${btnB.id}`, data, this);

                console.log(this.getAttribute('id'));
            }, true);
        };
    };

    getSwitchStateById(id: string): Number{
        let element: HTMLElement =  this.myFramework.getElementById(id);
        let input: HTMLInputElement = <HTMLInputElement> element;

        return input.checked? 1:0;
    }
}