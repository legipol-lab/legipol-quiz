"use strict";
// scripts/importarTema02.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var app_1 = require("firebase-admin/app");
var firestore_1 = require("firebase-admin/firestore");
// Inicializa Firebase Admin SDK
(0, app_1.initializeApp)();
var db = (0, firestore_1.getFirestore)();
// Ruta al archivo JSON local
var filePath = path_1.default.resolve("public/data/Tema_02.json");
var rawData = fs_1.default.readFileSync(filePath, "utf8");
var preguntas = JSON.parse(rawData);
console.log("\u2705 Archivo cargado. Total de preguntas: ".concat(preguntas.length));
// Colección donde guardarás las preguntas
var preguntasRef = db.collection("questions");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var i, p, match, tema, tipo, area, opciones, respuestaCorrecta;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < preguntas.length)) return [3 /*break*/, 4];
                p = preguntas[i];
                match = p.category.match(/TEMA (\d+) - (.*?) - (Primera|Segunda) Vuelta/i);
                tema = match ? "Tema ".concat(match[1], ". ").concat(match[2]) : p.category;
                tipo = match ? match[3].toLowerCase().replace(" ", "_") : "examen_oficial";
                area = "Ciencias Jurídicas";
                if (tema && parseInt(tema.split(" ")[1]) > 26) {
                    area = "Ciencias Sociales";
                }
                if (tema && parseInt(tema.split(" ")[1]) > 37) {
                    area = "Materias Técnico-Científicas";
                }
                opciones = p.answers.map(function (a) { return a.answer; });
                respuestaCorrecta = p.answers.findIndex(function (a) { return a.correct === "1"; });
                return [4 /*yield*/, preguntasRef.add({
                        area: area,
                        tema: tema,
                        tipo: tipo,
                        dificultad: p.type === "radio" ? "fácil" : "media",
                        enunciado: p.question,
                        opciones: opciones,
                        correcta: respuestaCorrecta,
                        explicacion: p.explanation || "",
                        createdAt: new Date(),
                        updatedAt: new Date()
                    })];
            case 2:
                _a.sent();
                console.log("\u2705 Pregunta \"".concat(p.id, "\" guardada"));
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4:
                console.log("\uD83C\uDF89 ".concat(preguntas.length, " preguntas importadas correctamente."));
                return [2 /*return*/];
        }
    });
}); })();
