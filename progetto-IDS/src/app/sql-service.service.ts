import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';

interface myData {
  message: string,
  success: boolean
}

@Injectable({
providedIn: 'root'
})


export class SqlServiceService {

  valori: Array<string>;
  var1:object;


  constructor(private http:HttpClient) 
  {
  }
  //Generamos las funciones que nos serviran para manipular nuestras entidades
  getSomeData(user, pass)
  {
    console.log("llego al servicio getSomeData: ->");
    //return this.http.get<myData>(`${this.URL}conexion.php`);
    //return this.http.get("/api/conexion.php");
    return this.http.post('/api/login.php', {
      user,
      pass
    })
    //return this.http.get<myData>("../../../src/app/conexion.php");
  
  }//fin funcion de login

  mio_profilo(user, pass)
  {
    console.log("servicio mio profilo: ->");
    return this.http.post('/api/mio_profilo.php', {
      user,
      pass
    })
    
  }//fin del metodo mio_profilo

  insert_misura(tariffa,conta,lavoro,perce,ris)
  {


    console.log("servicio insert misura: ->");
    //return this.http.get<myData>(`${this.URL}conexion.php`);
    //return this.http.get("/api/conexion.php");
    return this.http.post('/api/insert_misura.php', {
      tariffa,conta,lavoro,perce,ris
    })
    
  }//fin del metodo mio_profilo

  select_descrizione(nomeCat,descrizione)
  {

    console.log("servicio select_descrizione: ->");
    return this.http.post('/api/select_categoria.php', {
      nomeCat,descrizione
    })
    
  }//fine select descrizione

  select_attrezzatura()
  {
    return this.http.post('/api/select_attre.php',{})
    
  }//fine select attrezzatura

  select_qualifica()
  {
        
    return this.http.post('/api/select_qualifica.php',{})
    
  }//fine select attrezzatura
  contabilita(budget)
  {
    console.log("servicio contabilita: ->");
    return this.http.post('/api/select_contabilita.php', {
      budget
    });
    
  }//fine contabilita

  updateInvalida(item_id)
  {
     console.log("servicio contabilita: ->");
     return this.http.post('/api/update_valida.php', {
      item_id
     })
  }//fine update invalida

  update_info(dati:object)
  {
    console.log("servicio update: ->");
    console.log(dati);
    this.var1=dati["col1"];
    console.log(this.var1["ci"]);
    

    /*
*/


    //return this.http.get("/api/conexion.php");
    return this.http.post('/api/update_user.php',         
      
      this.var1
    )
    //return this.http.get<myData>("../../../src/app/conexion.php");
  }//fin del metodo update

logueo(user: string,pass:string) {
    
    console.log("llego al servicio 2::");
     //this.http.get('http://localhost/myCRUD/src/api/productos.php?user='+user+'&pass='+pass+'');
    console.log(this.http.post('http://localhost/ids3/Progetto_ids/progetto-ids/src/app/mis_php/login.php',
     {
      "user": user,
      "pass":pass
     }
     ));


     //this.http.post("http://localhost/Hall-Management-System/api/login.php",{"index_signin":index_signin,"password_signin":password_signin}).map(res=>res.json())
     
     console.log("datos del usuario");
     //console.log(this.datos);

  //   $scope.result = response.records;
  //console.log($scope.result[0].ini);
  //  var a=$scope.result[0].ini; 
  }
  detallar(id: number) {
    return this.http.get('http://localhost/myCRUD/src/api/productos.php?opcion=2&id=' + id);
  }
  guardar(item: Object) {
    return this.http.post('http://localhost/myCRUD/src/api/productos.php?opcion=3', item);
  } 
  modificar(item: Object) {
    return this.http.post('http://localhost/myCRUD/src/api/productos.php?opcion=4', item);
  }
  eliminar(id: number) {
    throw new Error("Method not implemented.");
  }


}