class EtchSketch {
    constructor(initialSize = 16) {
        this.container = document.getElementById('sketch-container');
        this.colorPicker = document.getElementById('colorPicker');
        this.randomColorBtn = document.getElementById('randomColorBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.addRowBtn = document.getElementById('addRowBtn');
        this.removeRowBtn = document.getElementById('removeRowBtn');

        this.drawingColor = '#000000';
        this.isRandomMode = false;
        this.size = initialSize;
        this.initializeGrid();
        this.attachEventListeners();
    }

    initializeGrid() {
        this.container.innerHTML = '';
        for (let i = 0; i < this.size; i++) {
            const row = document.createElement('div');
            row.className = 'row g-0';

            for (let j = 0; j < this.size; j++) {
                const tile = document.createElement('div');
                tile.className = 'col tile';
                tile.addEventListener('mouseenter', () => {
                    if (this.isRandomMode) {
                        this.drawingColor = this.getRandomColor();
                        this.colorPicker.value = this.drawingColor;
                    }
                    tile.style.backgroundColor = this.drawingColor;
                });
                row.appendChild(tile);
            }

            this.container.appendChild(row);
        }
    }

    attachEventListeners() {
        this.randomColorBtn.addEventListener('click', () => {
            this.isRandomMode = true;
            this.drawingColor = this.getRandomColor();
            this.colorPicker.value = this.drawingColor;
        });

        this.clearBtn.addEventListener('click', () => this.clearGrid());
        this.addRowBtn.addEventListener('click', () => this.adjustGridSize(1));
        this.removeRowBtn.addEventListener('click', () => this.adjustGridSize(-1));

        this.colorPicker.addEventListener('change', (e) => {
            this.isRandomMode = false;
            this.drawingColor = e.target.value;
        });
    }

    clearGrid() {
        const tiles = this.container.querySelectorAll('.tile');
        tiles.forEach(tile => {
            tile.style.backgroundColor = '';
        });
    }

    adjustGridSize(change) {
        this.size = Math.max(4, Math.min(this.size + change, 64));
        this.initializeGrid();
    }

    getRandomColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new EtchSketch();
});