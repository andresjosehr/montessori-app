"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[678],{4678:(tt,d,n)=>{n.r(d),n.d(d,{PropertiesModule:()=>K});var s=n(6895),u=n(2510),p=n(7155),v=n(7579),t=n(4650),f=n(529),g=n(2340);let C=(()=>{class e{constructor(o){this._httpClient=o}getList(o,r){const a=new f.LE({fromObject:{...r,...o}});return this._httpClient.get(`${g.N.api}/properties`,{params:a})}get(o){return this._httpClient.get(`${g.N.api}/properties/${o}`)}}return e.\u0275fac=function(o){return new(o||e)(t.LFG(f.eN))},e.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var h=n(4859),l=n(9549),c=n(4144),x=n(266),P=n(7392),_=n(2494),T=n(8739);let y=(()=>{class e{transform(o,r){return o?o.length>r?o.substr(0,r)+"...":o:" - "}}return e.\u0275fac=function(o){return new(o||e)},e.\u0275pipe=t.Yjl({name:"excerpt",type:e,pure:!1}),e})(),L=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({}),e})();function A(e,i){1&e&&(t.TgZ(0,"span"),t._uU(1,"creado"),t.qZA())}function U(e,i){1&e&&(t.TgZ(0,"span"),t._uU(1,"actualizado"),t.qZA())}function N(e,i){if(1&e&&(t.TgZ(0,"fuse-alert",33)(1,"span",34),t._uU(2,"Exito"),t.qZA(),t._uU(3," La propiedad ha sido "),t.YNc(4,A,2,0,"span",35),t.YNc(5,U,2,0,"span",35),t._uU(6," exitosamente "),t.qZA()),2&e){const o=t.oxw();t.Q6J("type","success"),t.xp6(4),t.Q6J("ngIf","1"===o.m),t.xp6(1),t.Q6J("ngIf","2"===o.m)}}function D(e,i){1&e&&(t.TgZ(0,"th",36),t._uU(1,"ID"),t.qZA())}function w(e,i){if(1&e&&(t.TgZ(0,"td",37)(1,"span",38),t._uU(2),t.qZA()()),2&e){const o=i.$implicit;t.xp6(2),t.hij(" ",o.id," ")}}function Y(e,i){1&e&&(t.TgZ(0,"th",36),t._uU(1,"Descripci\xf3n"),t.qZA())}function S(e,i){if(1&e&&(t.TgZ(0,"td",39)(1,"span",38),t._uU(2),t.ALo(3,"excerpt"),t.qZA()()),2&e){const o=i.$implicit;t.Q6J("matTooltip",o.description)("matTooltipPosition","left"),t.xp6(2),t.hij(" ",t.xi3(3,3,o.description,100)," ")}}function Q(e,i){1&e&&(t.TgZ(0,"th",36),t._uU(1,"Direccion"),t.qZA())}function B(e,i){if(1&e&&(t.TgZ(0,"td",40)(1,"span",38),t._uU(2),t.qZA()()),2&e){const o=i.$implicit;t.xp6(2),t.hij(" ",o.address," ")}}function j(e,i){1&e&&(t.TgZ(0,"th",36),t._uU(1,"Localidad"),t.qZA())}function J(e,i){if(1&e&&(t.TgZ(0,"td",40)(1,"span",38),t._uU(2),t.qZA()()),2&e){const o=i.$implicit;t.xp6(2),t.hij(" ",o.location_type||"-"," ")}}function M(e,i){1&e&&(t.TgZ(0,"th",36),t._uU(1,"Precio"),t.qZA())}function z(e,i){if(1&e&&(t.TgZ(0,"td",40)(1,"span",38),t._uU(2),t.qZA()()),2&e){const o=i.$implicit;t.xp6(2),t.hij(" ",o.price||"-"," ")}}function b(e,i){1&e&&(t.TgZ(0,"th",36),t._uU(1,"Fecha publicado"),t.qZA())}function E(e,i){if(1&e&&(t.TgZ(0,"td",40)(1,"span",38),t._uU(2),t.qZA()()),2&e){const o=i.$implicit;t.xp6(2),t.hij(" ",o.published_at||"-"," ")}}function F(e,i){1&e&&(t.TgZ(0,"th",36),t._uU(1,"Acciones"),t.qZA())}function I(e,i){if(1&e){const o=t.EpF();t.TgZ(0,"td",37)(1,"div",41)(2,"div",42)(3,"mat-icon",43),t._uU(4,"edit"),t.qZA()(),t.TgZ(5,"div",42)(6,"mat-icon",44),t.NdJ("click",function(){const m=t.CHM(o).$implicit,k=t.oxw();return t.KtG(k.newTab("propiedad/"+m.id))}),t._uU(7,"visibility"),t.qZA()()()()}}function $(e,i){1&e&&t._UZ(0,"tr",45)}function q(e,i){1&e&&t._UZ(0,"tr",46)}const R=function(){return[10,25,100]},O=[{path:"lista",component:(()=>{class e{constructor(o){this._propertiesService=o,this.columns=["id","description","address","location_type","price","published_at","acciones"],this.m=null,this._unsubscribeAll=new v.x}ngOnInit(){this.getProperties()}getProperties(o={},r={page:1,perPage:10}){this._propertiesService.getList(o,r).subscribe(a=>{this.dataSource=new p.by(a.data.data),console.log(a),this.propertiesPaginated=a.data})}paginate(o){this.getProperties(this.getValues(),{page:o.pageIndex+1,perPage:o.pageSize})}getValues(){return null}newTab(o){const r=new URL(o,window.location.origin);window.open(r.toString(),"_blank")}}return e.\u0275fac=function(o){return new(o||e)(t.Y36(C))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-properties-list"]],decls:52,vars:8,consts:[[1,"w-full"],[1,"grid","sm:grid-cols-2","gap-8","w-full","mb-6"],[1,"w-full","col-span-1"],[1,"text-3xl","font-bold"],[1,"text-secondary"],[3,"type",4,"ngIf"],[1,"sm:col-span-6","flex","flex-col","flex-auto","p-6","bg-card","shadow","rounded-2xl","overflow-hidden"],[1,"grid","grid-cols-12"],[1,"col-span-3"],[1,"text-lg","font-medium","tracking-tight","leading-6","truncate"],[1,"col-span-9"],[1,"flex","gap-3","justify-end"],[1,"w-2/5"],["type","text","matInput",""],[1,"w-1/5"],[1,"flex","mt-7","gap-1"],["mat-stroked-button","",1,"rounded","w-full","p-0","bg-primary-300","text-on-primary-300"],[1,"flex","flex-col","flex-auto","mt-2","overflow-x-auto"],["mat-table","",1,"min-w-240","overflow-y-visible",3,"dataSource"],["matColumnDef","id"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","description"],["mat-cell","","class","px-4",3,"matTooltip","matTooltipPosition",4,"matCellDef"],["matColumnDef","address"],["mat-cell","","class","px-4",4,"matCellDef"],["matColumnDef","location_type"],["matColumnDef","price"],["matColumnDef","published_at"],["matColumnDef","acciones"],["mat-header-row","",4,"matHeaderRowDef"],["class","cursor-pointer","mat-row","",4,"matRowDef","matRowDefColumns"],["aria-label","Select page",3,"length","pageSize","pageSizeOptions","page"],[3,"type"],["fuseAlertTitle",""],[4,"ngIf"],["mat-header-cell",""],["mat-cell",""],[1,"font-medium"],["mat-cell","",1,"px-4",3,"matTooltip","matTooltipPosition"],["mat-cell","",1,"px-4"],[1,"flex","gap-2"],[1,"1/2"],[1,"text-on-primary-300"],[1,"text-on-primary-300",3,"click"],["mat-header-row",""],["mat-row","",1,"cursor-pointer"]],template:function(o,r){1&o&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),t._uU(4,"Propiedades"),t.qZA(),t.TgZ(5,"div",4),t._uU(6,"Una lista de propiedades registradas en el sistema"),t.qZA()(),t._UZ(7,"div",2),t.TgZ(8,"div",2),t.YNc(9,N,7,3,"fuse-alert",5),t.qZA()(),t.TgZ(10,"div",6)(11,"div",7)(12,"div",8)(13,"div",9),t._uU(14,"Detalles de la propiedad"),t.qZA()(),t.TgZ(15,"div",10)(16,"div",11)(17,"div",12)(18,"mat-form-field",0)(19,"mat-label"),t._uU(20,"Buscar Propiedad"),t.qZA(),t._UZ(21,"input",13),t.qZA()(),t.TgZ(22,"div",14)(23,"div",15)(24,"button",16),t._uU(25,"Buscar"),t.qZA()()()()()(),t.TgZ(26,"div",17)(27,"table",18),t.ynx(28,19),t.YNc(29,D,2,0,"th",20),t.YNc(30,w,3,1,"td",21),t.BQk(),t.ynx(31,22),t.YNc(32,Y,2,0,"th",20),t.YNc(33,S,4,6,"td",23),t.BQk(),t.ynx(34,24),t.YNc(35,Q,2,0,"th",20),t.YNc(36,B,3,1,"td",25),t.BQk(),t.ynx(37,26),t.YNc(38,j,2,0,"th",20),t.YNc(39,J,3,1,"td",25),t.BQk(),t.ynx(40,27),t.YNc(41,M,2,0,"th",20),t.YNc(42,z,3,1,"td",25),t.BQk(),t.ynx(43,28),t.YNc(44,b,2,0,"th",20),t.YNc(45,E,3,1,"td",25),t.BQk(),t.ynx(46,29),t.YNc(47,F,2,0,"th",20),t.YNc(48,I,8,0,"td",21),t.BQk(),t.YNc(49,$,1,0,"tr",30),t.YNc(50,q,1,0,"tr",31),t.qZA(),t.TgZ(51,"mat-paginator",32),t.NdJ("page",function(m){return r.paginate(m)}),t.qZA()()()()),2&o&&(t.xp6(9),t.Q6J("ngIf",r.m),t.xp6(18),t.Q6J("dataSource",r.dataSource),t.xp6(22),t.Q6J("matHeaderRowDef",r.columns),t.xp6(1),t.Q6J("matRowDefColumns",r.columns),t.xp6(1),t.Q6J("length",null==r.propertiesPaginated?null:r.propertiesPaginated.total)("pageSize",null==r.propertiesPaginated?null:r.propertiesPaginated.per_page)("pageSizeOptions",t.DdM(7,R)))},dependencies:[s.O5,h.lW,l.KE,l.hX,c.Nt,x.gM,p.BZ,p.fO,p.as,p.w1,p.Dz,p.nj,p.ge,p.ev,p.XQ,p.Gk,P.Hw,_.W,T.NW,y]}),e})()},{path:"",pathMatch:"full",redirectTo:"lista"}];var Z=n(4006),H=n(4385),X=n(7775),G=n(979),V=n(3231);let W=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[s.ez,h.ot,l.lN,H.LD,Z.UX,u.Bz,Z.u5,c.c,x.AV,c.c,p.p0,P.Ps,V.Co,X.fC,L,T.TU,G.c]}),e})(),K=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[s.ez,u.Bz.forChild(O),W]}),e})()}}]);