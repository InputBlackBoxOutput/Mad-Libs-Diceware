# Check madlibs diceware wordlists 

for each in ['adverbs', 'adjectives', 'nouns']:
	with open(f'{each}.txt', 'r') as infile:
		data = infile.read().splitlines()

		print(f"\nPart of speech: {each}")
		print(f"Number of words: {len(data)}")
		print(f"Unique: {len(set(data))}")

		print("Duplicates if any: ")
		unique = []
		for each in data:
			if each not in unique:
				unique.append(each)
			else:
				print(each)