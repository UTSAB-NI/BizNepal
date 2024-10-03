using AutoMapper;
using BizNepal.Server.Models.DTO;
using BizNepal.Server.Models;

namespace BizNepal.Server.Utilities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Business, BusinessResponseDto>()
            .ForMember(dest => dest.Location, opt => opt.MapFrom(src => new Location
            {
                LocationId = src.Location.LocationId,
                Latitude = src.Location.Latitude,
                Longitude = src.Location.Longitude
            }))

            .ForMember(dest => dest.Category, opt => opt.MapFrom(src => new Category
            {
                CategoryId = src.CategoryId,
                CategoryName = src.Category.CategoryName
            }))

            .ForMember(dest => dest.BusinessImages, opt => opt.MapFrom(src => src.BusinessImages))

            .ForMember(dest => dest.Reviews, opt => opt.MapFrom(src => src.Reviews));
        }
    }
}
