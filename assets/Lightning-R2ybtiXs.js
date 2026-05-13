import{r as d,j as B}from"./index-AbmUZ0-C.js";const H=({hue:h=220,xOffset:p=0,speed:g=1.6,intensity:v=.6,size:S=2})=>{const x=d.useRef(null);return d.useEffect(()=>{const o=x.current;if(!o)return;const u=()=>{const r=o.clientWidth,a=o.clientHeight;r>0&&a>0&&(o.width=r,o.height=a)};u(),window.addEventListener("resize",u);const n=typeof ResizeObserver<"u"?new ResizeObserver(()=>u()):null;n==null||n.observe(o);const c=()=>{window.removeEventListener("resize",u),n==null||n.disconnect()},e=o.getContext("webgl",{alpha:!0,antialias:!1,powerPreference:"low-power"});if(!e){c();return}e.clearColor(0,0,0,1);const w=`
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `,T=`
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHue;
      uniform float uXOffset;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;
      
      #define OCTAVE_COUNT 6

      vec3 hsv2rgb(vec3 c) {
          vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
          return c.z * mix(vec3(1.0), rgb, c.y);
      }

      float hash11(float p) {
          p = fract(p * .1031);
          p *= p + 33.33;
          p *= p + p;
          return fract(p);
      }

      float hash12(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * .1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
      }

      mat2 rotate2d(float theta) {
          float c = cos(theta);
          float s = sin(theta);
          return mat2(c, -s, s, c);
      }

      float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 fp = fract(p);
          float a = hash12(ip);
          float b = hash12(ip + vec2(1.0, 0.0));
          float c = hash12(ip + vec2(0.0, 1.0));
          float d = hash12(ip + vec2(1.0, 1.0));
          
          vec2 t = smoothstep(0.0, 1.0, fp);
          return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
      }

      float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < OCTAVE_COUNT; ++i) {
              value += amplitude * noise(p);
              p *= rotate2d(0.45);
              p *= 2.0;
              amplitude *= 0.5;
          }
          return value;
      }

      void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
          vec2 uv = fragCoord / iResolution.xy;
          uv = 2.0 * uv - 1.0;
          uv.x *= iResolution.x / iResolution.y;
          uv.x += uXOffset;
          uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0;
          // Avoid divide-by ~0 → NaN/black frames when bolt crosses center
          float dist = max(abs(uv.x), 0.03);
          vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 0.8));
          vec3 col = baseColor * (mix(0.0, 0.09, hash11(iTime * uSpeed)) / dist) * uIntensity;
          fragColor = vec4(col, 1.0);
      }

      void main() {
          mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `,L=(r,a)=>{const i=e.createShader(a);return i?(e.shaderSource(i,r),e.compileShader(i),e.getShaderParameter(i,e.COMPILE_STATUS)?i:(console.error("[Lightning] shader compile:",e.getShaderInfoLog(i)),e.deleteShader(i),null)):null},f=L(w,e.VERTEX_SHADER),s=L(T,e.FRAGMENT_SHADER);if(!f||!s){c();return}const t=e.createProgram();if(!t){e.deleteShader(f),e.deleteShader(s),c();return}if(e.attachShader(t,f),e.attachShader(t,s),e.linkProgram(t),!e.getProgramParameter(t,e.LINK_STATUS)){console.error("[Lightning] program link:",e.getProgramInfoLog(t)),e.deleteProgram(t),e.deleteShader(f),e.deleteShader(s),c();return}e.useProgram(t);const C=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),A=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,A),e.bufferData(e.ARRAY_BUFFER,C,e.STATIC_DRAW);const R=e.getAttribLocation(t,"aPosition");e.enableVertexAttribArray(R),e.vertexAttribPointer(R,2,e.FLOAT,!1,0,0);const P=e.getUniformLocation(t,"iResolution"),y=e.getUniformLocation(t,"iTime"),E=e.getUniformLocation(t,"uHue"),F=e.getUniformLocation(t,"uXOffset"),_=e.getUniformLocation(t,"uSpeed"),U=e.getUniformLocation(t,"uIntensity"),I=e.getUniformLocation(t,"uSize"),O=performance.now();let l,b=!1;const z=()=>{const r=o.clientWidth,a=o.clientHeight;r>0&&a>0&&(o.width!==r||o.height!==a)&&(o.width=r,o.height=a)},m=()=>{if(b)return;z();const{width:r,height:a}=o;if(r<1||a<1){l=requestAnimationFrame(m);return}e.viewport(0,0,r,a),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(t),e.uniform2f(P,r,a),e.uniform1f(y,(performance.now()-O)/1e3),e.uniform1f(E,h),e.uniform1f(F,p),e.uniform1f(_,g),e.uniform1f(U,v),e.uniform1f(I,S),e.drawArrays(e.TRIANGLES,0,6),l=requestAnimationFrame(m)};return l=requestAnimationFrame(m),()=>{b=!0,c(),cancelAnimationFrame(l),e.deleteProgram(t),e.deleteShader(f),e.deleteShader(s),e.deleteBuffer(A)}},[h,p,g,v,S]),B.jsx("canvas",{ref:x,className:"w-full h-full relative block min-h-px"})},X=d.memo(H);export{X as default};
