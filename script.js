const products=[
{id:1,type:"restaurant",name:"Ember & Oak",desc:"Premium dark restaurant website with menu, reservations and ordering UI.",price:2500},
{id:2,type:"business",name:"Business Pro",desc:"Modern corporate website for services, agencies and local businesses.",price:2000},
{id:3,type:"store",name:"GearZone",desc:"Clean e-commerce storefront layout for products, collections and offers.",price:3000},
{id:4,type:"portfolio",name:"Creator Portfolio",desc:"Personal portfolio for developers, designers, photographers and creators.",price:1500},
{id:5,type:"restaurant",name:"Saffron House",desc:"Elegant restaurant template for Moroccan, Mediterranean or fine dining brands.",price:2300},
{id:6,type:"business",name:"Prime Agency",desc:"Bold agency landing page designed around services and lead generation.",price:2200},
{id:7,type:"store",name:"Urban Wear",desc:"Fashion storefront with product-focused layout and promotional sections.",price:2800},
{id:8,type:"portfolio",name:"Studio Noir",desc:"Minimal creative portfolio with projects, about and contact sections.",price:1700},
{id:9,type:"business",name:"Realty One",desc:"Property and real-estate presentation website with listing cards.",price:2400}
];
const money=n=>n.toLocaleString("en-US")+" DH";
function render(filter="all"){
 const box=document.getElementById("products");
 const list=filter==="all"?products:products.filter(p=>p.type===filter);
 box.innerHTML=list.map(p=>`
 <article class="product">
  <div class="preview ${p.type}"><div class="mini-browser"><strong>${p.name}</strong><div class="mini-title">${p.type==="restaurant"?"Good food.":p.type==="store"?"Better gear.":p.type==="portfolio"?"Create.":"Grow your business."}</div><div class="mini-line"></div><div class="mini-line" style="width:45%"></div></div><span class="preview-tag">${p.type}</span></div>
  <div class="product-body"><h3>${p.name}</h3><p>${p.desc}</p><div class="product-foot"><strong class="product-price">${money(p.price)}</strong><button class="buy" data-id="${p.id}">View & order →</button></div></div>
 </article>`).join("");
 document.querySelectorAll(".buy").forEach(b=>b.onclick=()=>openOrder(+b.dataset.id));
}
function openOrder(id){
 const p=products.find(x=>x.id===id);
 document.getElementById("orderTitle").textContent=p.name;
 document.getElementById("orderDesc").textContent=p.desc;
 document.getElementById("orderPrice").textContent=money(p.price)+" · one-time";
 document.getElementById("orderModal").classList.add("open");
 document.getElementById("orderModal").dataset.product=p.name;
}
document.querySelectorAll(".filters button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");render(b.dataset.filter)});
document.getElementById("close").onclick=()=>document.getElementById("orderModal").classList.remove("open");
document.getElementById("orderModal").onclick=e=>{if(e.target.id==="orderModal")e.target.classList.remove("open")};
document.getElementById("orderForm").onsubmit=e=>{
 e.preventDefault();const data=new FormData(e.target);const product=document.getElementById("orderModal").dataset.product;
 const requests=JSON.parse(localStorage.getItem("webforgeOrders")||"[]");requests.push({product,...Object.fromEntries(data),created:new Date().toISOString()});localStorage.setItem("webforgeOrders",JSON.stringify(requests));
 document.getElementById("orderModal").classList.remove("open");alert("Order request received! Connect this form to your email, WhatsApp, CRM or payment provider for real customer orders.");e.target.reset();
};
document.getElementById("contactForm").onsubmit=e=>{e.preventDefault();localStorage.setItem("webforgeContact",JSON.stringify(Object.fromEntries(new FormData(e.target))));alert("Message saved in this demo. Connect the form to your email/CRM before publishing.");e.target.reset()};
document.getElementById("hamb").onclick=()=>document.getElementById("nav").classList.toggle("open");
document.querySelectorAll("nav a").forEach(a=>a.onclick=()=>document.getElementById("nav").classList.remove("open"));
render();
