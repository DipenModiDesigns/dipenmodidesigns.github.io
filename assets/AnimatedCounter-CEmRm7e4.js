import{c as F,r as e,j as M}from"./index-C3HjATxy.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=F("Award",[["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}],["path",{d:"M15.477 12.89 17 22l-5-3-5 3 1.523-9.11",key:"em7aur"}]]),E=({value:t,suffix:f="",duration:s=1500,decimals:r=0,...l})=>{const[n,o]=e.useState(0),a=e.useRef(null),c=e.useRef(!1);e.useEffect(()=>{const i=a.current;if(!i)return;const u=new IntersectionObserver(([x])=>{if(x.isIntersecting&&!c.current){c.current=!0;const m=parseFloat(t)||0,A=performance.now(),p=w=>{const y=w-A,d=Math.min(y/s,1),v=1-Math.pow(1-d,3);o(m*v),d<1?requestAnimationFrame(p):o(m)};requestAnimationFrame(p)}},{threshold:.3});return u.observe(i),()=>u.disconnect()},[t,s]);const h=r>0?n.toFixed(r):Math.round(n);return M.jsxs("span",{ref:a,...l,children:[h,f]})};export{j as A,E as a};
