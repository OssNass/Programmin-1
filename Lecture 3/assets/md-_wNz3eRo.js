import{b as o,o as i,w as l,g as a,i as s,v as u,x as m,A as t}from"./modules/vue-Cf7Ekhr3.js";import{_ as p}from"./default-qBMU5kXc.js";import{u as c,f as d}from"./slidev/context-ChW77MMQ.js";import"./index-BY2VQQv0.js";import"./modules/shiki-bwpZXzD7.js";const C={__name:"Lecture 3.md__slidev_39",setup(x){const{$clicksContext:e,$frontmatter:n}=c();return e.setup(),(f,r)=>(i(),o(p,u(m(t(d)(t(n),38))),{default:l(()=>[...r[0]||(r[0]=[a("h1",null,"الخوارزميات",-1),a("h2",null,"الـ Pseudo Code",-1),a("div",{class:"grid grid-cols-2 gap-6",dir:"ltr"},[s(" LEFT COLUMN "),a("div",null,[a("pre",null,`Algorithm SolveQuadratic(a, b, c):
1. if a == 0:
       print("Not a quadratic equation")
       return
2. Delta = b^2 - 4 * a * c
3. if Delta > 0:
       x1 = (-b + sqrt(Delta)) / (2 * a)
       x2 = (-b - sqrt(Delta)) / (2 * a)
       print("Two real roots:", x1, x2)
`)]),a("div",null,[a("pre",null,`4. else if Delta == 0:
       x = -b / (2 * a)
       print("One real root:", x)
5. else:
       realPart = -b / (2 * a)
       imaginaryPart = sqrt(abs(Delta)) / (2 * a)
       x1 = realPart + i * imaginaryPart
       x2 = realPart - i * imaginaryPart
       print("Two complex roots:", x1, x2)
6. return
`)])],-1)])]),_:1},16))}};export{C as default};
