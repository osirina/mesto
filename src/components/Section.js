export default class Section {
    constructor( {items, renderer} , containerSelector) {
        this._renderedItems = items;
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }

    //публичный метод который отвечает за отрисовку всех элементов
    renderItems() {
        this._renderedItems.forEach(item => {
            this._renderer(item);
        })
    }

    // публичный метод addItem который принимает ДОМ элемент и добавляет его в контейнер
    addItem(element) {
        this._container.prepend(element);
    }
}