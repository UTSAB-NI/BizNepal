using System.Text.Json;

namespace BizNepal.Server.DatabaseSeeder
{
    public static class JsonHelper
    {
        public static List<T> LoadJson<T>(string filePath)
        {
            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException($"JSON file not found at path: {filePath}");
            }

            var jsonData = File.ReadAllText(filePath);
            return JsonSerializer.Deserialize<List<T>>(jsonData) ?? new List<T>();
        }
    }
}
