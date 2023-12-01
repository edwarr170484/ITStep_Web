class HTMLTag{
    constructor(name){
        this.name = name;
        this.id = '';
        this.classes = [];
        this.attributes = [];
        this.children = [];
        this.text = '';
    }

    setId(id){
        this.id = id;
    }

    setText(text){
        this.text = text;
    }

    addClass(className){
        this.classes.push(className);
    }

    addAttrubute(attribute){
        this.attributes.push(attribute);
    }

    addChild(tag){
        this.children.push(tag);
    }

    render(){
        let res = `<${this.name} class="${this.classes.join(' ')}" id="${this.id}" ${this.renderAttributes()}>${this.text}\r\n`;

        if(this.children.length > 0){
            this.children.forEach((child) => {
                res += '\t' + child.render();
            });
        }

        res += `\r\n</${this.name}>`;

        return res;
    }

    renderAttributes(){
        let attributes = "";

        this.attributes.forEach((attr) => {
            attributes += `${attr.name}="${attr.value}" `;
        });

        return attributes;
    }
}

class HTMLAttr{
    constructor(name, value){
        this.name = name;
        this.value = value;
    }
}

let ul = new HTMLTag("ul");
ul.setId("menu");
ul.addClass("list-unstyled");
ul.addClass("list-inline");

let li1 = new HTMLTag("li");
let a1 = new HTMLTag("a");
let href = new HTMLAttr("href", "https://google.com");
let target = new HTMLAttr("target", "_blank");
a1.addAttrubute(href);
a1.addAttrubute(target);
a1.setText("Google");
li1.addChild(a1);
ul.addChild(li1);

let li2 = new HTMLTag("li");
li2.setText("Facebook");
ul.addChild(li2);

let li3 = new HTMLTag("li");
li3.setText("Twitter");
ul.addChild(li3);

let li4 = new HTMLTag("li");
let a2 = new HTMLTag("a");
href = new HTMLAttr("href", "https://linkedin.com");
target = new HTMLAttr("target", "_blank");
a2.addAttrubute(href);
a2.addAttrubute(target);

let img = new HTMLTag("img");
let src = new HTMLAttr("src", "https://cropas.by/wp-content/uploads/2023/02/Linkedin-Logo.png");
let alt = new HTMLAttr("alt", "");
let style = new HTMLAttr("style", "width: 200px");
img.addAttrubute(src);
img.addAttrubute(alt);
img.addAttrubute(style);

a2.addChild(img);
li4.addChild(a2);
ul.addChild(li4);

let w = document.getElementById("wrapper");
w.innerHTML = ul.render();

