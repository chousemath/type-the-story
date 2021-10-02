const bellingCat: Array<string> = [
  'The Mice once called a meeting to decide on a plan to free themselves of their enemy, the Cat.',
  'At least they wished to find some way of knowing when she was coming, so they might have time to run away.',
  'Indeed, something had to be done, for they lived in such constant fear of her claws that they hardly dared stir from their dens by night or day.',
  'Many plans were discussed, but none of them was thought good enough.',
  'At last a very young Mouse got up and said:',
  '"I have a plan that seems very simple, but I know it will be successful. All we have to do is to hang a bell about the Cat\'s neck. When we hear the bell ringing we will know immediately that our enemy is coming."',
  'All the Mice were much surprised that they had not thought of such a plan before.',
  'But in the midst of the rejoicing over their good fortune, an old Mouse arose and said:',
  '"I will say that the plan of the young Mouse is very good. But let me ask one question: Who will bell the Cat?"',
  'The moral of the story is "It is one thing to say that something should be done, but quite a different matter to do it."'
]
const frogOx: Array<string> = [
  'An Ox came down to a reedy pool to drink.',
  'As he splashed heavily into the water, he crushed a young Frog into the mud.',
  'The old Frog soon missed the little one and asked his brothers and sisters what had become of him.',
  '"A great big monster," said one of them, "stepped on little brother with one of his huge feet!"',
  '"Big, was he!" said the old Frog, puffing herself up. "Was he as big as this?"',
  '"Oh, much bigger!" they cried.',
  'The Frog puffed up still more.',
  '"He could not have been bigger than this," she said.',
  'But the little Frogs all declared that the monster was much, much bigger and the old Frog kept puffing herself out more and more until, all at once, she burst.',
  'The moral of the story is, "Do not attempt the impossible.".'
]
const threeLittlePigs: Array<string> = [
  'Once upon a time there was an old mother pig who had three little pigs and not enough food to feed them.',
  'So when they were old enough, she sent them out into the world to seek their fortunes.',
  'The first little pig was very lazy.',
  'He didn\'t want to work at all and he built his house out of straw.',
  'The second little pig worked a little bit harder but he was somewhat lazy too and he built his house out of sticks.',
  'Then, they sang and danced and played together the rest of the day.',
  'The third little pig worked hard all day and built his house with bricks.',
  'It was a sturdy house complete with a fine fireplace and chimney.',
  'It looked like it could withstand the strongest winds.',
  'The next day, a wolf happened to pass by the lane where the three little pigs lived; and he saw the straw house, and he smelled the pig inside.',
  'He thought the pig would make a mighty fine meal and his mouth began to water.',
  'So he knocked on the door and said:',
  '"Little pig! Little pig! Let me in! Let me in!"',
  'But the little pig saw the wolf\'s big paws through the keyhole, so he answered back:',
  '"No! No! No! Not by the hairs on my chinny chin chin!"',
  'Then the wolf showed his teeth and said:',
  '"Then I\'ll huff and I\'ll puff and I\'ll blow your house down."',
  'So he huffed and he puffed and he blew the house down!',
  'The wolf opened his jaws very wide and bit down as hard as he could, but the first little pig escaped and ran away to hide with the second little pig.',
  'The wolf continued down the lane and he passed by the second house made of sticks; and he saw the house, and he smelled the pigs inside, and his mouth began to water as he thought about the fine dinner they would make.',
  'So he knocked on the door and said:',
  '"Little pigs! Little pigs! Let me in! Let me in!"',
  'But the little pigs saw the wolf\'s pointy ears through the keyhole, so they answered back:',
  '"No! No! No! Not by the hairs on our chinny chin chin!"',
  'So the wolf showed his teeth and said:',
  '"Then I\'ll huff and I\'ll puff and I\'ll blow your house down!"',
  'So he huffed and he puffed and he blew the house down!',
  'The wolf was greedy and he tried to catch both pigs at once, but he was too greedy and got neither!',
  'His big jaws clamped down on nothing but air and the two little pigs scrambled away as fast as their little hooves would carry them.',
  'The wolf chased them down the lane and he almost caught them.',
  'But they made it to the brick house and slammed the door closed before the wolf could catch them.',
  'The three little pigs they were very frightened, they knew the wolf wanted to eat them.',
  'And that was very, very true.',
  'The wolf hadn\'t eaten all day and he had worked up a large appetite chasing the pigs around and now he could smell all three of them inside and he knew that the three little pigs would make a lovely feast.',
  'So the wolf knocked on the door and said:',
  '"Little pigs! Little pigs! Let me in! Let me in!"',
  'But the little pigs saw the wolf\'s narrow eyes through the keyhole, so they answered back:',
  '"No! No! No! Not by the hairs on our chinny chin chin!"',
  'So the wolf showed his teeth and said:',
  '"Then I\'ll huff and I\'ll puff and I\'ll blow your house down."',
  'Well! he huffed and he puffed.',
  'He puffed and he huffed.',
  'And he huffed, huffed, and he puffed, puffed; but he could not blow the house down.',
  'At last, he was so out of breath that he couldn\'t huff and he couldn\'t puff anymore.',
  'So he stopped to rest and thought a bit.',
  'But this was too much.',
  'The wolf danced about with rage and swore he would come down the chimney and eat up the little pig for his supper.',
  'But while he was climbing on to the roof the little pig made up a blazing fire and put on a big pot full of water to boil.',
  'Then, just as the wolf was coming down the chimney, the little piggy pulled off the lid, and plop! in fell the wolf into the scalding water.',
  'So the little piggy put on the cover again, boiled the wolf up, and the three little pigs ate him for supper.'
]
interface Story {
  title: string;
  story: Array<string>;
}
const stories: Array<Story> = [
  { title: 'The Three Little Pigs', story: threeLittlePigs },
  { title: 'The Frog and the Ox', story: frogOx },
  { title: 'Belling the Cat', story: bellingCat }
]
export { stories }
