import { Component, OnInit, Inject, Input } from '@angular/core';
//import { Component, OnInit, Inject, Input, AfterViewChecked,AfterViewInit,AfterContentChecked,AfterContentInit, DoCheck  } from '@angular/core';

import { EthcontractService } from '../ethcontract.service';
import { SqlServiceService } from '../sql-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-misura-modal',
  templateUrl: './misura-modal.component.html',
  styleUrls: ['./misura-modal.component.css']
})
export class MisuraModalComponent implements OnInit {

  title = 'your first DApp in Angular 7 ';
  accounts: any;
  transferFrom = '0x0';
  balance = '0 ETH';
  transferTo = '';
  amount = 0;
  remarks = '';
  valor = "";
  form: FormGroup;
  result: any;
  categorias :any;
  lavori :any;
  tariffa: string;
  percentuale: number;
  riserva: string;
  num_categoria: number;
  accumulato:string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ethcontractService: EthcontractService, private SqlService: SqlServiceService, public fb: FormBuilder) {

    console.log("---------------------------------------")
    this.SqlService.select_categorie().subscribe(data =>{ 
      this.categorias = data["records"];
    });

    this.SqlService.select_lavori().subscribe(data =>{ 
      this.lavori = data["records"];
    });

    this.SqlService.select_accumulato(1,1).subscribe(data => {
         var a=data["records"][0].accumulato;
      if(a=="")
      {this.accumulato="100";
      }
      else{
      
      this.accumulato=a;
      }
      console.log("en constructor: ",this.accumulato)

      

      });
    

  }//fine constructor


  ngOnInit() {
    console.log("ACCOUNT modal:");
    console.log(this.data.account);
    
    this.form = this.fb.group({
      percent: ['', [Validators.required, Validators.min(1), Validators.max(Number(this.accumulato)),Validators.maxLength(3)]]
    });
  
    

     console.log("actual:... ",this.accumulato);

    //
    console.log("antessss");
    


  }//fine ngOnInit

  // ngAfterViewInit()
  // {
  //   this.ShowSelected();
  // }

// ngAfterContentChecked(){
//     console.log("after content checked")
//   }
//   ngDoCheck(){
//     console.log("do check")
//   }
//   ngAfterContentInit(){
//     console.log("after content init");
//   }
//   ngAfterViewChecked(){
//     console.log("after view checked")
//   }
  
  salva_misura() {
   let test= this.form.controls['percent'].invalid;
    let val_cat = (<HTMLSelectElement>document.getElementById('categoria')).value;
    let val_lav = (<HTMLSelectElement>document.getElementById('lavoro')).value;
    let val_cat1 = (<HTMLSelectElement>document.getElementById('categoria'));
    let val_lav1 = (<HTMLSelectElement>document.getElementById('lavoro'));

    
    var selected1 = val_cat1.options[val_cat1.selectedIndex].text;
    var selected2 = val_lav1.options[val_lav1.selectedIndex].text;
    for (let lav of this.categorias) {
      
      if (lav.id == val_cat) {
        this.tariffa = lav.tariffa;
        //       this.num_categoria=lav.name;
      }
    }

    console.log(this.tariffa)
    console.log(val_cat)
    console.log(val_lav)
    console.log(this.percentuale)
    console.log(this.riserva)
    //this.ethcontractService.create_misura(this.tariffa,val_cat,val_lav,this.percentuale,this.riserva,this.data.account);
    let that = this;
    //deploed contract
    this.ethcontractService.create_misura(
      this.tariffa,
      selected1,
      selected2,
      this.percentuale,
      this.riserva,
      this.data.account,

    ).then(function () {

      console.log("funziona contract")
    }).catch(function (error) {
      console.log(error);
      console.log("FALSEEE")

    });
    //finisce lavoro smartcontract


    console.log("arrivato insert sql")

      this.SqlService.insert_misura(this.tariffa, val_cat, val_lav, this.percentuale, this.riserva).subscribe(data => {
        console.log("insert corretto..");
        console.log(data);

        //this.result = data["records"];
        //console.log($scope.result[0].ini);
        //var a=this.result[0].ini;
      });
    


  }//FINE SALVA MISURA

 percEsatta(){

  if(this.percentuale<1 || this.percentuale>100){

    this.percentuale=0;
  }
      
}//fine percEsatta

ShowSelected()
{
/* Para obtener el valor */
var cat = (<HTMLSelectElement>document.getElementById("categoria")).value;
/* Para obtener el texto */
var des = (<HTMLSelectElement>document.getElementById("lavoro")).value;
console.log("valoresss: ",cat,des)

//si invia categoria e descrizione per ottenere accumulato percentuale attuale
this.SqlService.select_accumulato(cat,des).subscribe(data => {

      var a=data["records"][0].accumulato;
      if(a=="")
      {this.accumulato="100";
      }
      else{
      
      this.accumulato=a;
      }

        //this.result = data["records"];
        //console.log($scope.result[0].ini);
        //var a=this.result[0].ini;
      });
 
this.form = this.fb.group({
      percent: ['', [Validators.required, Validators.min(1), Validators.max(Number(this.accumulato)),Validators.maxLength(3)]]
    });

}//fine showSelected


}//fine class export
