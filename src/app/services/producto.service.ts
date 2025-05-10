import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:3000/api/productos';
  
  // Datos de respaldo por si falla la conexión
  private productosRespaldo: Producto[] = [
    new Producto(1, 'Laptop', 5000, 'assets/laptop.jpg'),
    new Producto(2, 'Smartphone', 10000, 'assets/smartphone.jpg'),
    new Producto(3, 'Tablet', 4000, 'assets/tablet.jpg'),
  ];

  constructor(private http: HttpClient) {}
  
  obtenerProducto(): Observable<Producto[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data.map(item => new Producto(
        item.id,
        item.nombre,
        item.precio,
        item.imagen || `assets/${item.nombre.toLowerCase()}.jpg`,
        1
      ))),
      catchError(error => {
        console.error('Error obteniendo productos de la API:', error);
        return of(this.productosRespaldo);
      })
    );
  }
}