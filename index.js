async function init() {
	Util.init({ backButton: false });
	const pages = await (await fetch("pages.json")).json();
	const pagelist = document.getElementById("page-list");

	pages.forEach(page => {
		const html = `
        <a href="/pages/${page.id}" class="page-link">
        <div class="page">
            <p class="p-title">${page.title}</p>
            <p class="p-desc">${page.desc}</p>
        </div>
        </a>
        `;
		pagelist.innerHTML += html;
	});
}