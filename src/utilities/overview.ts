import { IDocumentation } from "@/models/documentation";

export const overView = (documentation: IDocumentation) => {
    let a = window.open('', '', 'height=500px, width=450px');
    if (a){
        a.document.write('<html><body >');
        a.document.write(`<div class="ov-doc-title-container"> ${documentation.title}</div>`);
        let main = '<ul>'
        documentation.mainMenuItems.forEach(mainMenu => {
            main += `<li> ${mainMenu.title}</li>`;
        })
        main += '</ul>'
        a.document.write(main)
        a.document.write('</body></html>');
        a.document.close();
        a.print();
    }
}