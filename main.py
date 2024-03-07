# open specs.json loop over data and for every obj split "memory": "128GB, 256GB, 512GB", into a list of strings
# and write it back to the file
#
# Example:
# "memory": "128GB, 256GB, 512GB",
# becomes
# "memory": ["128GB", "256GB", "512GB"],

import json

with open('specs.json', 'r') as file:
    data = json.load(file)

    for obj in data:
        obj['memory'] = obj['memory'].split(', ')

with open('specs.json', 'w') as file:
    json.dump(data, file, indent=4)
    