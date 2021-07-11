document.getElementById("state").onkeyup = function() {
    let stateValue
    if(document.getElementById('state').value !== '') { stateValue = document.getElementById('state').value } else { stateValue = 'Having a custom RPC' }
    document.getElementById('stateLabel').textContent = stateValue
}

document.getElementById("details").onkeyup = function() {
    let detailsValue
    if(document.getElementById('details').value !== '') { detailsValue = document.getElementById('details').value } else { detailsValue = 'BaccRPC Maker' }
    document.getElementById('detailsLabel').textContent = detailsValue
}

document.getElementById("imgText").onkeyup = function() {
    let imgTextValue
    if(document.getElementById('imgText').value !== '') { imgTextValue = document.getElementById('imgText').value } else { imgTextValue = 'BaccRPC Maker' }
    document.getElementById('largeImgTextLabel').textContent = imgTextValue
}
