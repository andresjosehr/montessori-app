"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[592],{4752:(u,o,n)=>{n.d(o,{P:()=>l});var a=n(529),r=n(2340),i=n(4650);let l=(()=>{class t{constructor(e){this._httpClient=e}create(e){return this._httpClient.post(`${r.N.api}/asignatures`,e)}getList(e,s=""){const _=new a.LE({fromObject:{...e,searchString:s}});return this._httpClient.get(`${r.N.api}/asignatures`,{params:_})}get(e){return this._httpClient.get(`${r.N.api}/asignatures/${e}`)}update(e,s){return this._httpClient.put(`${r.N.api}/asignatures/${s}`,e)}getAll(){return this._httpClient.get(`${r.N.api}/get-all-asignatures`)}}return t.\u0275fac=function(e){return new(e||t)(i.LFG(a.eN))},t.\u0275prov=i.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},7305:(u,o,n)=>{n.d(o,{R:()=>l});var a=n(529),r=n(2340),i=n(4650);let l=(()=>{class t{constructor(e){this._httpClient=e}create(e){return this._httpClient.post(`${r.N.api}/college-degrees`,e)}getList(e,s=""){const _=new a.LE({fromObject:{...e,searchString:s}});return this._httpClient.get(`${r.N.api}/college-degrees`,{params:_})}get(e){return this._httpClient.get(`${r.N.api}/college-degrees/${e}`)}update(e,s){return this._httpClient.put(`${r.N.api}/college-degrees/${s}`,e)}reenviarCorreoRegistro(e){return this._httpClient.post(`${r.N.api}/college-degrees/reenviar-correo-registro/${e}`,{})}getAll(){return this._httpClient.get(`${r.N.api}/get-all-college-degrees`)}}return t.\u0275fac=function(e){return new(e||t)(i.LFG(a.eN))},t.\u0275prov=i.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);