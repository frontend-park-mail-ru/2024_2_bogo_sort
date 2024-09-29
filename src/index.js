'use strict';

import { MainPage } from "./pages/main/main.js";

const base = document.getElementById('root');

const main = new MainPage();
base.appendChild(main.render());