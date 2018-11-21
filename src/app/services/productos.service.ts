import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

 cargando = true;
 productos: Producto[] = [];
 productosFiltrado: Producto[] = [];

 constructor(private http: HttpClient) {
	this.cargarProductos();
 }

 private cargarProductos(){
	
	return new Promise((resolve,reject) => {
			this.http.get('https://angular-html-e020b.firebaseio.com/productos_idx.json')	
			.subscribe( (resp: Producto[]) => {
			//	console.log(resp);
			this.productos = resp;
			this.cargando = false;
			resolve();	
		});
	});

	
 }

 getProducto( id: string) {
	return this.http.get(`https://angular-html-e020b.firebaseio.com/productos/${ id }.json`);
 }

 buscarProducto(termino: string){

	if (this.productos.length === 0){
	//cargar Productos
		this.cargarProductos().then(() => {
		//se ejecuta despues de tener los productos
		// Aplicar Filtro
			this.filtrarProductos( termino );		
		});
	}else{
	//aplicar el filtro
		this.filtrarProductos( termino );
	}
	        
 }

 private filtrarProductos(termino: string){

	/*this.productosFiltrado = this.productos.filter( productos => {
	return true;
	});*/	
	this.productosFiltrado = [];
	termino = termino.toLocaleLowerCase();

	console.log( this.productos );
	this.productos.forEach(prod =>{
		
		const tituloLower = prod.titulo.toLocaleLowerCase();
		
		if (prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0){
			this.productosFiltrado.push( prod ); 		

		}
	});
	
 }

}
