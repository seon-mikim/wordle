export default function randomId(minIdNum, maxIdNum) {
	return Math.floor(Math.random()*(maxIdNum - minIdNum)+ minIdNum)
}

