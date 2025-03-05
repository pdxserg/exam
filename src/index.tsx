<script>
	function removeWhitespaces(string) {
	string.split(' ').filter(s => s !== '').join('_')
}

	console.log(removeWhitespaces('you are JS developer'))
</script>