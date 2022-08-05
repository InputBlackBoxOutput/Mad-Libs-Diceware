import pymongo

# Check madlibs diceware wordlists 
def check():
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

# Create wordlist collections in MongoDB 
def push_data_mongodb():
	username = str(input("Username: "))
	password = str(input("Password: "))
	uri = f"mongodb+srv://{username}:{password}@cluster0.ff8np.mongodb.net/?retryWrites=true&w=majority"
	client = pymongo.MongoClient(uri)
	db = client["Mad-Libs-Diceware"]

	# Mad Libs wordlist
	collection = db["mad-libs-wordlist"]
	for each in ["adverbs", "adjectives", "nouns"]:
		with open(f"./{each}.txt", 'r') as file:
			entry = { "part-of-speech": each[:-1], "list": file.read().splitlines()}
			collection.insert_one(entry)

	# EFF wordlist
	collection = db["eff-wordlist"]
	with open("./eff-wordlist.txt") as file:
		for each in file.read().splitlines():
			index, word = each.split("	")

			entry = {"index": index, "word":word}
			collection.insert_one(entry)



if __name__ == "__main__":
	push_data_mongodb()
