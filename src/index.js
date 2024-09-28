'use strict';

import { Main } from "./pages/main/main.js";

const base = document.getElementsByClassName('base')[0];

const main = new Main();
base.appendChild(main.render());