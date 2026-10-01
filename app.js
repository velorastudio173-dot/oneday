/* ONE DAY content hub — imagery and menu content are managed here. */
const siteVisuals={heroImage:'hero-one-day.png',categories:[
['kahveler','Kahveler','photo-1495474472287-4d71bcdd2085'],['soguk-kahveler','Soğuk Kahveler','photo-1461023058943-07fcbe16d735'],['sicak-icecekler','Sıcak İçecekler','photo-1512568400610-62da28bc8a13'],['caylar','Çaylar','photo-1564890369478-c89ca6d9cde9'],['bitki-caylari','Bitki Çayları','photo-1544787219-7f47ccb76574'],['frozen','Frozen','photo-1553530666-ba11a7da3888'],['smoothie','Smoothie','photo-1553530666-ba11a7da3888'],['milkshake','Milkshake','photo-1579954115545-a95591f28bfc'],['limonatalar','Limonatalar','photo-1621263764928-df1444c5e859'],['taze-sikimlar','Taze Sıkımlar','photo-1613478223719-2ab802602423'],['kokteyller','Kokteyller','photo-1536935338788-846bb9981813'],['soft-drinks','Soft Drinks','photo-1551024709-8f23befc6f87'],['kahvalti','Kahvaltı','photo-1533089860892-a7c6f0a88666'],['omletler','Omletler','photo-1525351484163-7529414344d8'],['tostlar','Tostlar','photo-1528735602780-2552fd46c7af'],['burgerler','Burgerler','photo-1568901346375-23c9450c58cd'],['makarnalar','Makarnalar','photo-1473093295043-cdd812d0e601'],['pizzalar','Pizzalar','photo-1513104890138-7c749659a591'],['ana-yemekler','Ana Yemekler','photo-1547592180-85f173990554'],['salatalar','Salatalar','photo-1540420773420-3366772f4999'],['tatlilar','Tatlılar','photo-1551024506-0bccd828d307'],['nargile','Nargile','photo-1520903920243-00d872a2d1c9']],
productImages:['photo-1495474472287-4d71bcdd2085','photo-1509042239860-f550ce710b93','photo-1514432324607-a09d9b4aefdd','photo-1517256673644-36ad11246d21','photo-1515003197210-e0cd71810b5f','photo-1541167760496-1628856ab772','photo-1501339847302-ac426a4a7cbb','photo-1521302080334-4bebac2763a6','photo-1497636577773-f1231844b336','photo-1495474472287-4d71bcdd2085']};
const imageUrl=(id,w=1000)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=84`;
const hero=document.querySelector('#hero-image');if(hero)hero.src=siteVisuals.heroImage;
const grid=document.querySelector('#category-grid');if(grid)grid.innerHTML=siteVisuals.categories.map(([s,n,img],i)=>`<a class="category-card" href="category.html?category=${s}" style="--card-delay:${Math.min(i,8)*45}ms"><img src="${imageUrl(img)}" alt="${n}" loading="lazy"><span class="category-card__veil"></span><span class="category-card__number">${String(i+1).padStart(2,'0')}</span><span class="category-card__name">${n}<i>↗</i></span></a>`).join('');
document.querySelectorAll('a[href="#categories"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();document.querySelector('#categories').scrollIntoView({behavior:'smooth'});}));
const cta=document.querySelector('.button--outline');if(cta)setInterval(()=>cta.classList.toggle('is-attention'),2200);
const wanted=new URLSearchParams(location.search).get('category');
const current=siteVisuals.categories.find(([s])=>s===wanted)||siteVisuals.categories[0];
const [key,title,cover]=current;
const intro=document.querySelector('#menu-intro'),list=document.querySelector('#product-grid'),rail=document.querySelector('#category-rail');
if(intro&&list&&rail){
  const labels=['Signature','Classic','House','Premium','Special','Fresh','Seasonal','Artisan','One Day','Lounge'];
  document.title=`${title} | ONE DAY`;
  rail.innerHTML=siteVisuals.categories.map(([s,n,img])=>`<a class="quick-category ${s===key?'is-active':''}" href="category.html?category=${s}"><img src="${imageUrl(img,240)}" alt=""><span>${n}</span></a>`).join('');
  intro.innerHTML=`<p class="section-label">✦ QR MENU ✦</p><h1>${title}</h1><p>Günün her anına eşlik eden, özenle hazırlanmış seçimlerimizi keşfedin.</p><img src="${imageUrl(cover,1800)}" alt="${title}">`;
  const products=labels.map((n,i)=>({name:`${n} ${title}`,price:`${135+i*18} ₺`,image:imageUrl(siteVisuals.productImages[i]),text:`Seçkin malzemeler ve One Day dokunuşuyla hazırlanan özel bir ${title.toLocaleLowerCase('tr-TR')} seçimi.`}));
  list.innerHTML=products.map((p,i)=>`<button class="product-card" data-id="${i}"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="product-card__index">${String(i+1).padStart(2,'0')}</span><div><h2>${p.name}</h2><p>${p.text}</p><strong>${p.price}</strong></div><b>+</b></button>`).join('');
  const dialog=document.querySelector('#product-modal'),modal=document.querySelector('#modal-content');
  list.onclick=e=>{const card=e.target.closest('.product-card');if(!card)return;const p=products[card.dataset.id];modal.innerHTML=`<img src="${p.image}" alt="${p.name}"><div class="modal-copy"><p class="section-label">ONE DAY SELECTION</p><h2>${p.name}</h2><strong>${p.price}</strong><p>${p.text}</p><span>Ürün içeriği ve alerjen bilgisi için ekibimize danışabilirsiniz.</span></div>`;dialog.showModal()};
  document.querySelector('.modal-close').onclick=()=>dialog.close();
  dialog.onclick=e=>{if(e.target===dialog)dialog.close()};
}
