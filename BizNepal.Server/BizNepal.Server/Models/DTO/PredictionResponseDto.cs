using System.Text.Json.Serialization;

namespace BizNepal.Server.Models.DTO;

public class PredictionResponseDto
{
    [JsonPropertyName("sentiment")]
    public int Sentiment { get; set; }

    [JsonPropertyName("positive_review")]
    public int PositiveReview { get; set; }

    [JsonPropertyName("negative_review")]
    public int NegativeReview { get; set; }
}
