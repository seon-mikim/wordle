const getAnswerWord = async() => {
	const response = await fetch('https://random-word-api.herokuapp.com/word?length=5')
	const jsonData = await response.json()
	return jsonData
}

export default getAnswerWord