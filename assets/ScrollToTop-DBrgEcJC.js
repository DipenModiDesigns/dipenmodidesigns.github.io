import{c as i,r as o,j as e,A as c,m as n}from"./index-D0dDhEp_.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=i("ArrowUp",[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]]),p=()=>{const[r,s]=o.useState(!1);o.useEffect(()=>{const t=()=>s(window.scrollY>600);return window.addEventListener("scroll",t,{passive:!0}),()=>window.removeEventListener("scroll",t)},[]);const a=()=>{window.scrollTo({top:0,behavior:"smooth"})};return e.jsx(c,{children:r&&e.jsx(n.button,{initial:{opacity:0,scale:.8,y:20},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.8,y:20},transition:{duration:.3},onClick:a,"aria-label":"Scroll to top",className:"fixed bottom-8 right-8 z-[45] w-14 h-14 rounded-full bg-accent-primary text-black shadow-2xl shadow-accent-primary/30 flex items-center justify-center hover:scale-110 hover:shadow-accent-primary/50 transition-all duration-300 cursor-pointer",children:e.jsx(l,{size:24,strokeWidth:2.5})})})};export{p as default};
