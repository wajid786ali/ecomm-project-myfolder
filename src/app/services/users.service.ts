import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signup, login } from '../data-type';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  isLoggedError = new EventEmitter<boolean>(false);

  constructor(private http:HttpClient, private router:Router) { }

  signup(data:signup){
    return this.http.post("http://localhost:3000/users",data, {observe:'response'})
    .subscribe((result)=>{
     console.warn(result);
     if(result){
       localStorage.setItem("user", JSON.stringify(result.body));
       this.router.navigate(['home']);
     } 
    })
  }
    
  userLogin(data:login){
   return this.http.get<signup>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe:'response'})
   .subscribe((result:any)=>{    
    if(result && result.body?.length){
      localStorage.setItem("user", JSON.stringify(result.body[0]))
      this.router.navigate(['home'])
      this.isLoggedError.emit(false);
    }else{
      console.warn("user not Found");
      this.isLoggedError.emit(true);
    }
   })
  }
}
