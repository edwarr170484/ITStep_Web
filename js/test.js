let list = {
    classes: [],
    attributes: [],
    items: [],
    addClass: function(className){
        this.classes.push(className);
    },
    addAtribute: function(attributeName, attributeValue){
        let attr = {
            name: '',
            value: ''
        }

        attr.name = attributeName;
        attr.value = attributeValue;

        this.attributes.push(attr);
    },
    addItem: function(item){
        this.items.push(item);
    },
    render(){
        let ul = document.createElement("ul");

        this.classes.forEach(function(cl){
            ul.classList.add(cl);
        });

        this.items.forEach(function(item){
            let li = document.createElement("li");
            let a = document.createElement("a");

            a.href = item.href;
            a.innerText = item.text;

            li.append(a);
            ul.append(li);
        });

        document.body.prepend(ul);
    }
}

let texts = [
    {text: "Главная", href: "https://mail.ru"},
    {text: "Блог", href: "https://google.com"},
    {text: "О нас", href: "https://ya.ru"},
    {text: "Контакты", href: "https://microsoft.com"},
];

texts.forEach(function(text){
    list.addItem(text);
});

list.addClass("list-unstyled");
list.addClass("list-inline");

list.render();