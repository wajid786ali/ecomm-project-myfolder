export interface signup{
 name:string;
 email:string;
 password:string;
}
export interface login{ 
 email:string,
 password:string,
}
export interface product{
 id:number,    
 name:string,
 category:string,
 price:number,
 color:string,
 description:string,
 imgUrl:string,
 quantity:number | undefined,
 productId:number | undefined
}
export interface cart{
    id:number | undefined,    
    name:string,
    category:string,
    price:number,
    color:string,
    description:string,
    imgUrl:string,
    quantity:number | undefined,
    userId:number,
    productId:number
}
export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}
export interface order{
    email:string,
    address:string,
    contact:string,
    payableAmount:number | undefined,
    userId:number,
    id:number | undefined
}