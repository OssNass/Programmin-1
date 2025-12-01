import{b as o,o as l,w as i,g as r,v as s,x as u,z as t}from"./modules/vue-5KVMM3ZU.js";import{_ as p}from"./default-CEF9jsO1.js";import{u as m,f as c}from"./slidev/context-Hlfl5YJa.js";import"./index-BExQWIUO.js";import"./modules/shiki-GoQqGqDH.js";const v={__name:"Lecture 3.md__slidev_39",setup(d){const{$clicksContext:e,$frontmatter:n}=m();return e.setup(),(x,a)=>(l(),o(p,s(u(t(c)(t(n),38))),{default:i(()=>[...a[0]||(a[0]=[r("h1",null,"الخوارزميات",-1),r("h2",null,"الـ Pseudo Code",-1),r("div",{class:"grid grid-cols-2 gap-6",dir:"ltr"},[r("div",null,[r("pre",null,`Algorithm SolveQuadratic(a, b, c):
1. if a == 0:
       print("Not a quadratic equation")
       return
2. Delta = b^2 - 4 * a * c
3. if Delta > 0:
       x1 = (-b + sqrt(Delta)) / (2 * a)
       x2 = (-b - sqrt(Delta)) / (2 * a)
       print("Two real roots:", x1, x2)
`)]),r("div",null,[r("pre",null,`4. else if Delta == 0:
       x = -b / (2 * a)
       print("One real root:", x)
5. else:
       realPart = -b / (2 * a)
       imaginaryPart = sqrt(abs(Delta)) / (2 * a)
       x1 = realPart + i * imaginaryPart
       x2 = realPart - i * imaginaryPart
       print("Two complex roots:", x1, x2)
6. return
`)])],-1)])]),_:1},16))}};export{v as default};
