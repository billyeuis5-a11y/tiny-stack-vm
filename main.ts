import{readdirSync,readFileSync,mkdirSync,writeFileSync}from'node:fs';
const e=process.env,I=e.MAKEFUN_INPUT_DIR??'/input',O=e.MAKEFUN_OUTPUT_DIR??'/output',T=new TextEncoder;
function R(P,N){
 const S=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),U=new Uint8Array(65536);
 let s=0,c=0,p=0,t=0,o=0,q=0,a=0;
 const E=e=>[U.subarray(0,o),e];
 for(;;){
  if(t==1e6)return E(10);
  if(p<0||p>=P.length)return E(9);
  const y=P[p];
  if(y>83||y>65&&y<80||y>52&&y<64||y>34&&y<48||y>7&&y<16||y==31)return E(5);
  const m=y==1?1:y==2?4:y>47&&y<52?2:0;
  if(p+m>=P.length)return E(9);
  t++;
  const n=p+1+m,J=((P[n-2]|P[n-1]<<8)<<16)>>16,B=y>15&&y<35&&y!=23&&y!=27,u=y==7?3:y==5||y==6||B||y==65?2:y<3||y==48||y==51||y==52||y==82?0:1,w=y==6||y==7?3:y==4||y==5?2:y==0||y==3||y>47&&y<53||y==65||y==80||y==81||y==83?0:1;
  if(s<u||s-u+w>256)return E(s<u?2:3);
  p=n;
  switch(y){
   case 0:return E(0);
   case 1:S[s++]=(P[n-1]<<24)>>24;break;
   case 2:S[s++]=P[n-4]|P[n-3]<<8|P[n-2]<<16|P[n-1]<<24;break;
   case 3:s--;break;
   case 4:S[s]=S[s-1];s++;break;
   case 5:a=S[s-1];S[s-1]=S[s-2];S[s-2]=a;break;
   case 6:S[s]=S[s-2];s++;break;
   case 7:a=S[s-3];S[s-3]=S[s-2];S[s-2]=S[s-1];S[s-1]=a;break;
   case 23:S[s-1]=-S[s-1]|0;break;
   case 27:S[s-1]=~S[s-1];break;
   case 48:p=n+J;break;
   case 49:case 50:if((y==49)==!S[--s])p=n+J;break;
   case 51:if(c==64)return E(7);C[c++]=n;p=P[n-2]|P[n-1]<<8;break;
   case 52:if(!c)return E(8);p=C[--c];break;
   case 64:a=S[s-1];if(a<0||a>255)return E(6);S[s-1]=M[a];break;
   case 65:a=S[s-1];if(a<0||a>255)return E(6);s-=2;M[a]=S[s];break;
   case 80:{const g=T.encode(''+S[s-1]);if(o+g.length>65536)return E(11);s--;U.set(g,o);o+=g.length;break}
   case 81:if(o+1>65536)return E(11);U[o++]=S[--s]&255;break;
   case 82:S[s++]=q<N.length?N[q++]:-1;break;
   case 83:return E(S[--s]&255);
   default:{
    const b=S[s-1],a=S[s-2];
    if(y>18&&y<23&&!b)return E(4);
    const r=y==16?a+b|0:y==17?a-b|0:y==18?Math.imul(a,b):y==19?a==-2147483648&&b==-1?a:(a/b)|0:y==20?b==-1?0:a%b|0:y==21?((a>>>0)/(b>>>0))|0:y==22?(a>>>0)%(b>>>0)|0:y==24?a&b:y==25?a|b:y==26?a^b:y==28?a<<(b&31):y==29?a>>(b&31):y==30?a>>>(b&31)|0:y==32?a==b?1:0:y==33?a<b?1:0:(a>>>0)<(b>>>0)?1:0;
    s-=2;S[s++]=r;
   }
  }
 }
}
for(const d of readdirSync(I).sort()){
 const r=R(readFileSync(`${I}/${d}/program.bin`),readFileSync(`${I}/${d}/input.bin`));
 mkdirSync(`${O}/${d}`,{recursive:true});
 writeFileSync(`${O}/${d}/stdout.bin`,r[0]);
 writeFileSync(`${O}/${d}/exit.txt`,r[1]+'\n');
}
