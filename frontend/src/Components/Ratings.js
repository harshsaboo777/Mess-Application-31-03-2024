import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./temp.js";

const Ratings = (props) => {
	const {rats} = props;
	const [rate, setRate] = useState(rats);
	return (
		<Container>
			{[...Array(5)].map((item, index) => {
				const givenRating = index + 1;
				return (
					<label>
						<Radio
							type="radio"
							value={givenRating}
							onClick={() => {
								setRate(givenRating);
							}}
						/>
						<Rating>
							<FaStar
								color={
									givenRating < rate || givenRating === rate
										? "gold"
										: "white"
								}
							/>
						</Rating>
					</label>
				);
			})}
		</Container>
	);
};

export default Ratings;
