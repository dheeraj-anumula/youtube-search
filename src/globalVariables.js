const API_KEY = properties.apiKey;
const nextDiv = document.querySelector(".next-div");
const prevDiv = document.querySelector(".prev-div");
const myList = document.querySelector('ul');
const form = document.querySelector('form');
const errorElement = document.querySelector(".error");

let pageToken;
let firstPageToken;
let searchText;